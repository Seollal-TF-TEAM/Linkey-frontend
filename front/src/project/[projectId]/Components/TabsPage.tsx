import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
// @ts-ignore
import classes from '../tabs.module.css';

function TabsComponentPage() {
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('1');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };

    return (
        <Tabs variant="none" value={value} onChange={setValue}>
            <Tabs.List ref={setRootRef} className={classes.list}>
                <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
                    First tab
                </Tabs.Tab>
                <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
                    Second tab
                </Tabs.Tab>

                <FloatingIndicator
                    target={value ? controlsRefs[value] : null}
                    parent={rootRef}
                    className={classes.indicator}
                />
            </Tabs.List>

            <Tabs.Panel value="1">First tab content</Tabs.Panel>
            <Tabs.Panel value="2">Second tab content</Tabs.Panel>
        </Tabs>
    );
}
export default TabsComponentPage;