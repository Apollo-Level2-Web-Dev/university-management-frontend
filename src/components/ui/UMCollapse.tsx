import { Collapse } from "antd";
const { Panel } = Collapse;

export type ItemProps = {
  key: string;
  label: string;
  children: React.ReactNode | React.ReactElement;
  isTaken?: boolean;
};

type UMCollapseProps = {
  items: ItemProps[];
  onChange?: (el: string | string[] | "") => void;
  defaultActiveKey?: string | string[];
};

const UMCollapse = ({
  items,
  onChange,
  defaultActiveKey = ["1"],
}: UMCollapseProps) => {
  return (
    <Collapse defaultActiveKey={defaultActiveKey} onChange={onChange}>
      {items?.map((item) => {
        return (
          <Panel header={item?.label} key={item?.key}>
            {item?.children}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default UMCollapse;
