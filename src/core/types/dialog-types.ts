export type DialogData = {
  title: string;
  type: DialogTypes;
  confirmText: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoadingConfirm?: boolean;
};

export type DialogTypes = 'confirm' | 'danger';
