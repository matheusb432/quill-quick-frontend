import { For } from 'solid-js';
import { HIDocumentCopy } from '~/assets/icons/HIDocumentCopy';
import { HIPencilSquare } from '~/assets/icons/HIPencilSquare';
import { HITrash } from '~/assets/icons/HITrash';
import { HIView } from '~/assets/icons/HIView';
import { ReviewItemFns } from '~/core/types/table-types';
import { IconButton } from './IconButton';
import { Tooltip } from './Tooltip';
import { HIBookOpen } from '~/assets/icons/HIBookOpen';

type TableIconsProps<T> = ReviewItemFns<T> & {
  row: T;
  rowName?: string;
};

export function TableIcons<T>(props: TableIconsProps<T>) {
  const icons = () => {
    const name = props.rowName ?? 'item';
    return [
      {
        actionFn: props.reviewFn,
        iconFn: HIBookOpen,
        tooltip: `Review ${name}`,
      },
      {
        actionFn: props.viewFn,
        iconFn: HIView,
        tooltip: `View ${name}`,
      },
      {
        actionFn: props.editFn,
        iconFn: HIPencilSquare,
        tooltip: `Edit ${name}`,
      },
      {
        actionFn: props.duplicateFn,
        iconFn: HIDocumentCopy,
        tooltip: `Duplicate ${name}`,
      },
      {
        actionFn: props.removeFn,
        iconFn: HITrash,
        tooltip: `Delete ${name}`,
        theme: 'danger' as const,
      },
    ].filter((x) => !!x.actionFn);
  };
  return (
    <For each={icons()}>
      {({ actionFn, iconFn, tooltip, theme }) => (
        <Tooltip text={tooltip} theme="secondary">
          <IconButton
            iconFn={iconFn}
            theme={theme}
            fabSize="md"
            onClick={() => actionFn?.(props.row)}
          />
        </Tooltip>
      )}
    </For>
  );
}
