import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux';
import Index from './Index/Index';
import User from './User/Index';
import Community from './Community/Community';
import Setting from './Setting/Setting';

const Page: React.FC = () => {
  const [pathName, setPathName] = useState('/user');

  const store = useStore();

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const newPathName = store.getState().page.pathName;
      setPathName(newPathName);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <>
      {(pathName === '/index' || pathName === '/') && <Index></Index>}
      {pathName === '/user' && <User></User>}
      {pathName === '/community' && <Community></Community>}
      {pathName === '/setting' && <Setting></Setting>}
    </>
  );
};
export default Page;
