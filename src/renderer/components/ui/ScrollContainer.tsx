/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ScrollArea } from './scroll-area';

import { cn } from '../../lib/utils';
import styles from '../../styles/ScrollContainer.module.css';

export function ScrollContainer({ children }: { children: React.ReactNode }) {
  console.log({ styles });
  return (
    <ScrollArea className={cn(styles.scrollContainer, 'h-full p-6')}>
      <div className="">{children}</div>
    </ScrollArea>
  );
}
