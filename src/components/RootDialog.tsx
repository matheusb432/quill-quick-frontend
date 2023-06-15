import { dialogStore } from '~/core/store/dialog-store';
import { Dialog } from './Dialog';
import { createMemo } from 'solid-js';
import { DialogData } from '~/core/types/dialog-types';

export function RootDialog() {
  const show = dialogStore.computed.show;
  const data = () => dialogStore.state.dialogs[0];
  const activeData = createMemo<Required<DialogData>>((prev) => data() ?? prev ?? {});

  return <Dialog show={show()} data={activeData()} />;
}
