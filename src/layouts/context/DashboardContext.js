import React, { createContext, useState, useCallback } from 'react';

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
   const [isLoading, setLoading] = useState(true);
    const [jsonDataImport, JsonDataSetter] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [info, setInfo] = useState('');
    const [itemsmenu, setitemsMenu] = useState('');
    const [itemsmenuprincipal, setitemsMenuPrincipal] = useState('');
    const [itemUrl, setitemsUrl] = useState('');



    /*
    Contexto para implementar las tablas EGRESADOS,MATRICULADOS,ADMITIDOS, E INSCRITOS
    */


    const itemsMenuCallBack = useCallback((e) => {
        let itemsurls = e?.lastIndexOf('dashboard');

        let n = e?.lastIndexOf('/');
        let totalcletras = e?.length;
        const items_sub = e?.substring(0, Number(n)).replace('/dashboard/', '').replace('/', '');
        const items = e
            ?.substring(Number(n), Number(totalcletras))
            .replace('/dashboard/', '')
            .replace('/', '');

        if (itemsurls === 1) {
            const str1 = e?.replace('dashboard', '');
            setitemsUrl(str1?.substring(1, 10));
        }
        //
        if (items_sub) {
           let userInfo = JSON.parse(sessionStorage.getItem('ITEM_SELECT'))
           if(userInfo?.memorizer.length>0){
            setitemsMenuPrincipal(userInfo?.memorizer);
           }
            // eslint-disable-next-line no-undef
        }
        if (items) {
            setitemsMenu(items);
        }

        // eslint-disable-next-line no-use-before-define
    }, []);
    const clearALL = useCallback((select) => {
        // eslint-disable-next-line no-lone-blocks
        {
            (() => {
                switch (select) {
                    case 'graduados':
                        return (<>{''}</>)
                        default:
                        return (<>{''}</>);
                }
            })();
        }
    }, []);

    const consultData = useCallback(
      (resp, itemUrl) => {
          // eslint-disable-next-line no-lone-blocks
          {
              (() => {
                  switch (itemUrl) {
                      case 'graduados':
                          return /*consultaGraduadosData(resp)*/;
                      default:
                          return <>{''}</>;
                  }
              })();
          }
      },
      []
    );
    const data = {
        itemsMenuCallBack,
        isLoading,
        setLoading,
        jsonDataImport,
        JsonDataSetter,
        selectedFile,
        setSelectedFile,
        itemsmenu,
        itemsmenuprincipal,
        itemUrl,
        consultData,
        info,
        setInfo,
        clearALL,
    };
    // eslint-disable-next-line react/jsx-no-undef
    return (
        <>
            <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
        </>
    );
};
export { DashboardContext, DashboardProvider };
