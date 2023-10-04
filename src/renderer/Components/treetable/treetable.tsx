import React, { ReactNode, useState } from 'react';

import './treetable.scss';

import { Identifier, TreeNode, Ledger, Button } from '../';
import { Column } from '../table/table';
import Row from '../table/row';
import Cell from '../table/cell';
import { relative } from 'path';


function ExpandedableRow(props:{value:TreeNode, columns:Column[], width:string, level?:number}) {
	const [expanded, setExpanded] = useState(false);
	const buttonIcon = expanded ? "fa fa-angle-down" : "fa fa-angle-right"

	return (<div className={"r-treetable-group" + (expanded ? " expanded" : "")}>
		<Row key={props.value.key}>
			{props.columns.map((col:Column, idx:number) => {
				let body = (col.body != undefined) ? <col.body {...props.value} />
											: props.value.data?.[col.field]

				let ret = [
					<Cell key={props.value.key + "-" + col.field}
						style={{width: props.width, paddingLeft:(props.level??0)*30 + "px", ...col.style}}
						editor={(col.editor != undefined) ? () => <col.editor {...props.value} kkey={props.value.key} /> : undefined}>

						{body}
					</Cell>
				]
				
				if (idx === 0 && props.value.children?.length > 0) {
					ret = [
						<Button icon={buttonIcon} onClick={() => setExpanded(curState => !curState)}
							style={{background:"transparent", color:"black"}}/>,
						...ret
					]
				}

				return ret
			}
			)}
		</Row>
		{expanded && props.value.children?.map((child:TreeNode) => {
			return <ExpandedableRow key={child.key} width={props.width} level={(props.level || 0) + 1}
				value={child} columns={props.columns} />
			}
		)}
	</div>)
}

function TreeTable(props:{id?:string,className?:string,
	value:TreeNode[], columns:Column[], header:any,
	style?:{[key:string]: string}, children?:ReactNode}) {
	
	const equalPercent = (100 / props.columns.length) + "%";

	return (
		<div className={props.className} style={props.style}>
			<div className="r-table-top">{props.header}</div>

			<Ledger columns={props.columns.map((col:Column) => col.header)}>
        {
          props.value.map((row) => {
            return <ExpandedableRow key={row.key} width={equalPercent}
							value={row} columns={props.columns} />
					}
          )}
      </Ledger>
		</div>
	)
};

TreeTable.defaultProps = {
  className: 'r-treetable',
}

export default TreeTable;
