import { saveAs } from 'file-saver';

// Export formats
export type ExportFormat = 'csv' | 'json' | 'xlsx' | 'pdf';

// Common export options
export interface ExportOptions {
  filename?: string;
  includeHeaders?: boolean;
  includeMetadata?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  filters?: Record<string, any>;
}

// Generic data export function
export async function exportData<T extends Record<string, any>>(
  data: T[],
  format: ExportFormat,
  options: ExportOptions = {}
) {
  const {
    filename = `sentinel_export_${new Date().toISOString().slice(0, 10)}`,
    includeHeaders = true,
    includeMetadata = true
  } = options;

  try {
    switch (format) {
      case 'csv':
        return await exportToCSV(data, filename, includeHeaders);
      case 'json':
        return await exportToJSON(data, filename, includeMetadata, options);
      case 'xlsx':
        return await exportToExcel(data, filename, includeHeaders);
      case 'pdf':
        return await exportToPDF(data, filename, options);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}

// CSV Export
async function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  includeHeaders: boolean
): Promise<void> {
  if (!data.length) {
    throw new Error('No data to export');
  }

  const headers = Object.keys(data[0]);
  const csvContent = [];

  // Add headers if requested
  if (includeHeaders) {
    csvContent.push(headers.map(h => `"${h}"`).join(','));
  }

  // Add data rows
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) return '""';
      if (typeof value === 'object') return `"${JSON.stringify(value)}"`;
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    csvContent.push(values.join(','));
  });

  const csvString = csvContent.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
}

// JSON Export
async function exportToJSON<T extends Record<string, any>>(
  data: T[],
  filename: string,
  includeMetadata: boolean,
  options: ExportOptions
): Promise<void> {
  const exportData: any = {
    data,
    exportedAt: new Date().toISOString(),
    totalRecords: data.length
  };

  if (includeMetadata) {
    exportData.metadata = {
      exportOptions: options,
      dataTypes: getDataTypes(data[0] || {}),
      summary: generateDataSummary(data)
    };
  }

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  saveAs(blob, `${filename}.json`);
}

// Excel Export (requires xlsx library)
async function exportToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string,
  includeHeaders: boolean
): Promise<void> {
  // Dynamically import xlsx to avoid bundle bloat
  const XLSX = await import('xlsx');

  const worksheet = XLSX.utils.json_to_sheet(data, { 
    header: includeHeaders ? undefined : [] 
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  // Add metadata sheet
  const metadataSheet = XLSX.utils.json_to_sheet([
    { Property: 'Export Date', Value: new Date().toISOString() },
    { Property: 'Total Records', Value: data.length },
    { Property: 'Columns', Value: Object.keys(data[0] || {}).length }
  ]);
  XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadata');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${filename}.xlsx`);
}

// PDF Export (requires jsPDF)
async function exportToPDF<T extends Record<string, any>>(
  data: T[],
  filename: string,
  options: ExportOptions
): Promise<void> {
  // Dynamically import jsPDF
  const jsPDF = (await import('jspdf')).default;
  require('jspdf-autotable');

  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text('Sentinel Data Export', 14, 20);
  
  // Add metadata
  doc.setFontSize(10);
  doc.text(`Export Date: ${new Date().toLocaleString()}`, 14, 30);
  doc.text(`Total Records: ${data.length}`, 14, 35);
  
  if (options.dateRange) {
    doc.text(`Date Range: ${options.dateRange.start.toLocaleDateString()} - ${options.dateRange.end.toLocaleDateString()}`, 14, 40);
  }

  // Prepare table data
  const headers = Object.keys(data[0] || {});
  const tableData = data.map(row => 
    headers.map(header => {
      const value = row[header];
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value || '');
    })
  );

  // Add table
  (doc as any).autoTable({
    head: [headers],
    body: tableData,
    startY: 50,
    styles: { fontSize: 8 },
    columnStyles: headers.reduce((acc, header, index) => {
      acc[index] = { cellWidth: 'auto' };
      return acc;
    }, {} as Record<number, any>)
  });

  doc.save(`${filename}.pdf`);
}

// Utility functions
function getDataTypes(sampleRow: Record<string, any>): Record<string, string> {
  const types: Record<string, string> = {};
  Object.entries(sampleRow).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      types[key] = 'null';
    } else if (Array.isArray(value)) {
      types[key] = 'array';
    } else if (value instanceof Date) {
      types[key] = 'date';
    } else {
      types[key] = typeof value;
    }
  });
  return types;
}

function generateDataSummary<T extends Record<string, any>>(data: T[]): Record<string, any> {
  if (!data.length) return {};

  const summary: Record<string, any> = {};
  const sampleRow = data[0];

  Object.keys(sampleRow).forEach(key => {
    const values = data.map(row => row[key]).filter(val => val !== null && val !== undefined);
    
    summary[key] = {
      nonNullCount: values.length,
      nullCount: data.length - values.length,
      uniqueCount: new Set(values.map(v => JSON.stringify(v))).size
    };

    // Add type-specific summary
    const firstValue = values[0];
    if (typeof firstValue === 'number') {
      const numbers = values.filter(v => typeof v === 'number');
      summary[key].min = Math.min(...numbers);
      summary[key].max = Math.max(...numbers);
      summary[key].average = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
    } else if (typeof firstValue === 'string') {
      summary[key].averageLength = values.reduce((sum, str) => sum + String(str).length, 0) / values.length;
    }
  });

  return summary;
}

// Specialized export functions for specific data types

export async function exportAlerts(alerts: any[], format: ExportFormat = 'csv') {
  const processedAlerts = alerts.map(alert => ({
    id: alert.id,
    titre: alert.title,
    description: alert.description,
    priorite: alert.priority,
    statut: alert.status,
    severite: alert.severity,
    source: alert.source,
    localisation: alert.location,
    date_creation: alert.createdAt,
    date_mise_a_jour: alert.updatedAt,
    assigne_a: alert.assignedTo?.name || '',
    tags: alert.tags?.join(', ') || '',
    nb_mentions: alert.mentions?.length || 0
  }));

  return exportData(processedAlerts, format, {
    filename: `sentinel_alerts_${new Date().toISOString().slice(0, 10)}`,
    includeHeaders: true,
    includeMetadata: true
  });
}

export async function exportNetworkData(networkData: { nodes: any[], edges: any[] }, format: ExportFormat = 'json') {
  const processedData = {
    summary: {
      totalNodes: networkData.nodes.length,
      totalEdges: networkData.edges.length,
      exportDate: new Date().toISOString()
    },
    nodes: networkData.nodes.map(node => ({
      id: node.id,
      label: node.label,
      type: node.type,
      influence: node.influence,
      sentiment: node.sentiment,
      connections: node.connections,
      verified: node.verified,
      metadata: node.metadata
    })),
    edges: networkData.edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      weight: edge.weight,
      strength: edge.strength,
      bidirectional: edge.bidirectional
    }))
  };

  if (format === 'json') {
    const jsonString = JSON.stringify(processedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    saveAs(blob, `sentinel_network_${new Date().toISOString().slice(0, 10)}.json`);
  } else {
    // For non-JSON formats, export nodes and edges separately
    await exportData(processedData.nodes, format, {
      filename: `sentinel_network_nodes_${new Date().toISOString().slice(0, 10)}`
    });
    await exportData(processedData.edges, format, {
      filename: `sentinel_network_edges_${new Date().toISOString().slice(0, 10)}`
    });
  }
}

export async function exportRawData(rawData: any[], format: ExportFormat = 'csv') {
  const processedData = rawData.map(item => ({
    id: item.id,
    timestamp: item.timestamp,
    source: item.source,
    platform: item.platform,
    contenu: item.content,
    auteur: item.author || '',
    localisation: item.location || '',
    sentiment: item.sentiment,
    engagement: item.engagement,
    portee: item.reach,
    verifie: item.verified ? 'Oui' : 'Non',
    langue: item.language,
    mots_cles: item.keywords?.join(', ') || '',
    categorie: item.category,
    priorite: item.priority
  }));

  return exportData(processedData, format, {
    filename: `sentinel_raw_data_${new Date().toISOString().slice(0, 10)}`,
    includeHeaders: true,
    includeMetadata: true
  });
}

export async function exportOpinionAnalysis(analysisData: any, format: ExportFormat = 'csv') {
  const processedData = {
    summary: analysisData.summary,
    keywords: analysisData.keywords?.map((kw: any) => ({
      mot_cle: kw.keyword,
      mentions: kw.mentions,
      sentiment_positif: kw.sentiment.positive,
      sentiment_negatif: kw.sentiment.negative,
      sentiment_neutre: kw.sentiment.neutral,
      evolution: kw.trend
    })) || [],
    geographic: analysisData.geographic?.map((geo: any) => ({
      region: geo.location,
      mentions: geo.mentions,
      sentiment_moyen: geo.averageSentiment
    })) || [],
    platforms: analysisData.platforms?.map((platform: any) => ({
      plateforme: platform.name,
      mentions: platform.mentions,
      engagement: platform.engagement
    })) || []
  };

  if (format === 'json') {
    const jsonString = JSON.stringify(processedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    saveAs(blob, `sentinel_opinion_analysis_${new Date().toISOString().slice(0, 10)}.json`);
  } else {
    // Export each section separately for CSV/Excel
    await exportData(processedData.keywords, format, {
      filename: `sentiment_analysis_keywords_${new Date().toISOString().slice(0, 10)}`
    });
  }
}