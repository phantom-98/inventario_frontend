export const formSchema = [
    {
        label: "Tipo Documento",
        value:"type", 
        type:"select", 
        options:[
            {value:"", label:"Tipo Documento"},
            {value:33, label:"Factura Electronica"},
            {value:52, label:"Guia de despacho"},
            {value:34, label:"Factura Exenta"},
            {value:61, label:"Nota de Credito"},
            {value:39, label:"Boleta"},
        ]
    },
    {
        label: "Cliente",
        value:"type", 
        type:"select", 
        options:[
            {value:"", label:"Seleccione cliente"},
            {value:true, label:"Cliente"},
            {value:false, label:"Proovedor"},
        ]
    },
    {
        label: "Producto",
        value:"type", 
        type:"select", 
        options:[
            {value:"", label:"Seleccione producto"},
            
        ]
    },
    
    
]