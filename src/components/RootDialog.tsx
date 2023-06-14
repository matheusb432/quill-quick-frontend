import { dialogStore } from '~/core/data/dialog-store';
import { Dialog } from './Dialog';
import { createMemo } from 'solid-js';
import { DialogData } from '~/core/types/dialog-types';

export function RootDialog() {
  const state = () => dialogStore.state;
  const show = () => state().show;
  const data = () => state().dialogs[0];
  const activeData = createMemo<Required<DialogData>>((prev) => data() ?? prev ?? {});

  return <Dialog show={show()} data={activeData()} />;
}
