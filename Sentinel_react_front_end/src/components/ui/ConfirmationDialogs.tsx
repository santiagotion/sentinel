import React, { ReactNode } from 'react';
import { AlertTriangle, Trash2, Check, X, Info, HelpCircle, Download, Upload, RotateCcw } from 'lucide-react';
import { ConfirmationModal } from './Modal';

// Generic confirmation dialog props
export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: 'default' | 'danger' | 'warning' | 'success';
  icon?: React.ComponentType<any>;
}

// Specialized confirmation dialogs

export interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType?: string;
  warningMessage?: string;
}

export function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = 'élément',
  warningMessage
}: DeleteConfirmationProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={`Supprimer ${itemType}`}
      message={
        <div className="space-y-3">
          <p>
            Êtes-vous sûr de vouloir supprimer <strong>"{itemName}"</strong> ?
          </p>
          {warningMessage && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">{warningMessage}</p>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cette action est irréversible.
          </p>
        </div>
      }
      confirmText="Supprimer"
      cancelText="Annuler"
      type="danger"
    />
  );
}

export interface BulkDeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
  itemType?: string;
}

export function BulkDeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  count,
  itemType = 'éléments'
}: BulkDeleteConfirmationProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Suppression en lot"
      message={
        <div className="space-y-3">
          <p>
            Êtes-vous sûr de vouloir supprimer <strong>{count} {itemType}</strong> ?
          </p>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800 dark:text-red-200">
                Cette action supprimera définitivement tous les éléments sélectionnés et ne peut pas être annulée.
              </p>
            </div>
          </div>
        </div>
      }
      confirmText={`Supprimer ${count} éléments`}
      cancelText="Annuler"
      type="danger"
    />
  );
}

export interface ExportConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  exportFormat: string;
  itemCount: number;
  estimatedSize?: string;
}

export function ExportConfirmation({
  isOpen,
  onClose,
  onConfirm,
  exportFormat,
  itemCount,
  estimatedSize
}: ExportConfirmationProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Confirmer l'exportation"
      message={
        <div className="space-y-3">
          <p>
            Exporter <strong>{itemCount.toLocaleString()} éléments</strong> au format <strong>{exportFormat.toUpperCase()}</strong> ?
          </p>
          {estimatedSize && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Taille estimée: {estimatedSize}
                </p>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Le fichier sera téléchargé automatiquement une fois généré.
          </p>
        </div>
      }
      confirmText="Exporter"
      cancelText="Annuler"
      type="success"
    />
  );
}

export interface ResetSettingsConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  settingsCategory?: string;
}

export function ResetSettingsConfirmation({
  isOpen,
  onClose,
  onConfirm,
  settingsCategory = 'tous les paramètres'
}: ResetSettingsConfirmationProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Réinitialiser les paramètres"
      message={
        <div className="space-y-3">
          <p>
            Êtes-vous sûr de vouloir réinitialiser <strong>{settingsCategory}</strong> ?
          </p>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Tous vos paramètres personnalisés seront perdus et remplacés par les valeurs par défaut.
              </p>
            </div>
          </div>
        </div>
      }
      confirmText="Réinitialiser"
      cancelText="Annuler"
      type="warning"
    />
  );
}

export interface ClearDataConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  dataType: string;
  retentionPeriod?: string;
}

export function ClearDataConfirmation({
  isOpen,
  onClose,
  onConfirm,
  dataType,
  retentionPeriod
}: ClearDataConfirmationProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Effacer les données"
      message={
        <div className="space-y-3">
          <p>
            Êtes-vous sûr de vouloir effacer <strong>{dataType}</strong> ?
          </p>
          {retentionPeriod && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Données concernées: {retentionPeriod}
            </p>
          )}
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800 dark:text-red-200">
                Cette action est irréversible. Assurez-vous d'avoir sauvegardé toutes les données importantes.
              </p>
            </div>
          </div>
        </div>
      }
      confirmText="Effacer les données"
      cancelText="Annuler"
      type="danger"
    />
  );
}

export interface UnsavedChangesConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSave?: () => void;
  changesDescription?: string;
}

export function UnsavedChangesConfirmation({
  isOpen,
  onClose,
  onConfirm,
  onSave,
  changesDescription = 'des modifications non sauvegardées'
}: UnsavedChangesConfirmationProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Modifications non sauvegardées"
      message={
        <div className="space-y-4">
          <p>
            Vous avez <strong>{changesDescription}</strong>. Que souhaitez-vous faire ?
          </p>
          
          {onSave && (
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  onSave();
                  onClose();
                }}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Sauvegarder</span>
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Ignorer</span>
              </button>
            </div>
          )}
          
          {!onSave && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Si vous continuez, vos modifications seront perdues.
            </p>
          )}
        </div>
      }
      confirmText={onSave ? undefined : "Continuer sans sauvegarder"}
      cancelText="Annuler"
      type="warning"
    />
  );
}

export interface LogoutConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hasUnsavedWork?: boolean;
}

export function LogoutConfirmation({
  isOpen,
  onClose,
  onConfirm,
  hasUnsavedWork = false
}: LogoutConfirmationProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Confirmer la déconnexion"
      message={
        <div className="space-y-3">
          <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
          {hasUnsavedWork && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Vous avez du travail non sauvegardé qui pourrait être perdu.
                </p>
              </div>
            </div>
          )}
        </div>
      }
      confirmText="Se déconnecter"
      cancelText="Annuler"
      type="warning"
    />
  );
}

export interface PermissionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  permissionType: string;
  reason: string;
}

export function PermissionConfirmation({
  isOpen,
  onClose,
  onConfirm,
  permissionType,
  reason
}: PermissionConfirmationProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Autorisation requise"
      message={
        <div className="space-y-3">
          <p>
            L'application demande l'autorisation d'accéder à <strong>{permissionType}</strong>.
          </p>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Raison:</strong> {reason}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vous pouvez révoquer cette autorisation à tout moment dans les paramètres.
          </p>
        </div>
      }
      confirmText="Autoriser"
      cancelText="Refuser"
      type="default"
    />
  );
}

// Hook for managing confirmation dialogs
export function useConfirmationDialog() {
  const [dialogState, setDialogState] = React.useState<{
    isOpen: boolean;
    type: string;
    props: any;
  }>({
    isOpen: false,
    type: '',
    props: {}
  });

  const openDialog = (type: string, props: any) => {
    setDialogState({
      isOpen: true,
      type,
      props: {
        ...props,
        onClose: () => setDialogState(prev => ({ ...prev, isOpen: false }))
      }
    });
  };

  const closeDialog = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  // Convenience methods
  const confirmDelete = (itemName: string, onConfirm: () => void, options?: Partial<DeleteConfirmationProps>) => {
    openDialog('delete', {
      itemName,
      onConfirm: () => {
        onConfirm();
        closeDialog();
      },
      ...options
    });
  };

  const confirmBulkDelete = (count: number, onConfirm: () => void, options?: Partial<BulkDeleteConfirmationProps>) => {
    openDialog('bulkDelete', {
      count,
      onConfirm: () => {
        onConfirm();
        closeDialog();
      },
      ...options
    });
  };

  const confirmExport = (exportFormat: string, itemCount: number, onConfirm: () => void, options?: Partial<ExportConfirmationProps>) => {
    openDialog('export', {
      exportFormat,
      itemCount,
      onConfirm: () => {
        onConfirm();
        closeDialog();
      },
      ...options
    });
  };

  const confirmResetSettings = (onConfirm: () => void, options?: Partial<ResetSettingsConfirmationProps>) => {
    openDialog('resetSettings', {
      onConfirm: () => {
        onConfirm();
        closeDialog();
      },
      ...options
    });
  };

  const confirmClearData = (dataType: string, onConfirm: () => void, options?: Partial<ClearDataConfirmationProps>) => {
    openDialog('clearData', {
      dataType,
      onConfirm: () => {
        onConfirm();
        closeDialog();
      },
      ...options
    });
  };

  const confirmUnsavedChanges = (onConfirm: () => void, options?: Partial<UnsavedChangesConfirmationProps>) => {
    openDialog('unsavedChanges', {
      onConfirm: () => {
        onConfirm();
        closeDialog();
      },
      ...options
    });
  };

  const confirmLogout = (onConfirm: () => void, options?: Partial<LogoutConfirmationProps>) => {
    openDialog('logout', {
      onConfirm: () => {
        onConfirm();
        closeDialog();
      },
      ...options
    });
  };

  const confirmPermission = (permissionType: string, reason: string, onConfirm: () => void) => {
    openDialog('permission', {
      permissionType,
      reason,
      onConfirm: () => {
        onConfirm();
        closeDialog();
      }
    });
  };

  // Render the appropriate dialog
  const renderDialog = () => {
    if (!dialogState.isOpen) return null;

    switch (dialogState.type) {
      case 'delete':
        return <DeleteConfirmation {...dialogState.props} />;
      case 'bulkDelete':
        return <BulkDeleteConfirmation {...dialogState.props} />;
      case 'export':
        return <ExportConfirmation {...dialogState.props} />;
      case 'resetSettings':
        return <ResetSettingsConfirmation {...dialogState.props} />;
      case 'clearData':
        return <ClearDataConfirmation {...dialogState.props} />;
      case 'unsavedChanges':
        return <UnsavedChangesConfirmation {...dialogState.props} />;
      case 'logout':
        return <LogoutConfirmation {...dialogState.props} />;
      case 'permission':
        return <PermissionConfirmation {...dialogState.props} />;
      default:
        return null;
    }
  };

  return {
    // State
    isOpen: dialogState.isOpen,
    
    // Actions
    openDialog,
    closeDialog,
    
    // Convenience methods
    confirmDelete,
    confirmBulkDelete,
    confirmExport,
    confirmResetSettings,
    confirmClearData,
    confirmUnsavedChanges,
    confirmLogout,
    confirmPermission,
    
    // Render
    renderDialog
  };
}