// ❌ NO MOCKING - ALL REMOVED!
// Everything is now handled by REAL backend with REAL video processing


export interface DownloadProgress {
  videoId: string;
  progress: number;
  status: 'downloading' | 'completed' | 'error';
  filePath?: string;
  error?: string;
}

// ❌ NO MOCK CLASS ANYMORE!
// All video processing is done by REAL backend:
// 1. Real video download with youtube-dl
// 2. Real audio extraction with FFmpeg
// 3. Real progress tracking
// 4. Real file management
// 
// Frontend only handles:
// - UI display
// - API calls to backend  
// - Progress polling
//
// ZERO mocking, ZERO simulation, ZERO fake data!

export class VideoDownloadService {
  async downloadVideo(): Promise<string> {
    throw new Error('❌ This method should not be called! Use backend API instead.');
  }

  getDownloadProgress(): DownloadProgress | undefined {
    throw new Error('❌ This method should not be called! Use backend API instead.');
  }

  async extractAudioTranscript(): Promise<string> {
    throw new Error('❌ This method should not be called! Use backend API instead.');
  }
}