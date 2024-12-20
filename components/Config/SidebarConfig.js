import { FaEnvelope } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';

const SidebarConfig = {


    ADMIN : [
        {id: 'subElement_1', name: "Products", icon: FaEnvelope,isExpand: false, 
            items: [
                {id:'subElement_1-item_1', name: 'Add Product', isActive: false, pathname: '/dashboard/pageOne'}, 
                {id:'subElement_1-item_2', name: 'Edit Product', isActive: false, pathname: '/dashboard/pageTwo'}, 
                {id:'subElement_1-item_3', name: 'View Products', isActive: false, pathname: '/dashboard/pageThree'}
            ] 
        },
        {id: 'subElement_2', name: "Shops", icon: FaEnvelope,isExpand: false, 
            items: [
                {id:'subElement_2-item_2', name: 'Item Three', isActive: false, pathname: '/dashboard/pageThree'}
            ] 
        },
        {id: 'subElement_3', name: "Executive Module", icon: FaEnvelope,isExpand: false, 
            items: [
                {id:'subElement_3-item_1', name: 'Add Executive', isActive: false, pathname: '/dashboard/addExecutive'},
                {id:'subElement_3-item_2', name: 'Manage Executive', isActive: false, pathname: '/dashboard/manageExecutive'}

            ] 
        }
    ],

    BDM :[
        {id: 'subElement_1', name: "Sub Two", icon: FaCog,isExpand: false, items: [
            {id:'subElement_1-item_3', name: 'Item Three', isActive: false, pathname: '/dashboard/pageThree'}
        ]}
    ] 

    

}


export default SidebarConfig;