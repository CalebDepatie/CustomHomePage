import React, { useState, useRef, useEffect } from 'react';

import { useFetch } from '../../Hooks';

import PageViewer from './pageViewer';

import { toast } from 'react-toastify';
import { Tree } from 'primereact/tree';
import TreeNode from 'primereact/treenode';
import { Dialog } from 'primereact/dialog';
import { Button, InputText } from '../../Components';

import './pages.scss';

function PageContainer(props:{}) {
  const [ edit, setEdit ] = useState(false);
  const [ nodes, setNodes ] = useState<any>([]);
  const [ selectedKey, setSelectedKey ] = useState('');

  const [ pageFetch, pageSignal ] = useFetch("get_pages");
  const [updatePageFetch,updatePageSignal] = useFetch("update_page");

  useEffect(() => {
    pageSignal({});
  }, [])

  useEffect(() => {
    if (pageFetch?.error) {
      toast.error('Could not Load Pages, ' + pageFetch!.error, {});
    } else {
      const pages = pageFetch?.body ?? [];

      const create_children = (key: string, parent: string) => {
        return pages.filter((itm:any) => itm.parent === parent).map((itm:any) => {
          return {
            key: key + '~' + itm.id,
            icon: itm.icon,
            label: itm.name,
            data: itm,
            children: create_children(key + '~' + itm.id, itm.id),
          };
        });
      };

      setNodes(pages.filter((itm:any) => itm.parent === '').map((itm:any) => {
        return {
          key: itm.id,
          icon: itm.icon,
          label: itm.name,
          data: itm,
          children: create_children(itm.id, itm.id),
        };
      }));
    }
  }, [pageFetch]);

  useEffect(() => {
    if (updatePageFetch?.error) {
      toast.error('Could not update page, ' + updatePageFetch!.error, {});
    }
  }, [updatePageFetch]);

  // lift up
  const findNodeByKey = (nodes:TreeNode[], key:string): TreeNode|null => {
    const path:string[]    = key.split('~');
    let node:TreeNode|null = null;

    while (path.length) {
      let list:TreeNode[] = node?.children ?? nodes;
      node = list.filter((i:TreeNode) => i.data.id == path[0])[0];
      path.shift();
    }

    return node;
  }

  const publish = (newText:string) => {
    updatePageSignal({body: JSON.stringify({id:selectedKey, updateCol:"content", updateVal:newText})});

    setNodes((curNodes:any) => {
      let newNodes = JSON.parse(JSON.stringify(curNodes));
      const updatedNode = findNodeByKey(newNodes, selectedKey);
      updatedNode!.data!.content = newText;

      return newNodes;
    });
  }

  return (
    <>
    <div style={{display:"flex"}}>
      <div style={{width:"300px", marginRight:"5px"}}>
        <Button label="Add Page"/>
        <Button label={edit ? "Publish Page" : "Edit Page"} onClick={() => setEdit(!edit)} />
        <Tree value={nodes} selectionMode="single" selectionKeys={selectedKey}
          onSelectionChange={(e:any) => setSelectedKey(e.value)} />
      </div>

      <PageViewer page={nodes.nestedFilter((item:any) => item.data.id === selectedKey)?.[0]?.data?.content ?? ''}
        edit={edit} onPublish={publish} className='r-pages' />
    </div>
    </>
  );
};

export default PageContainer;
