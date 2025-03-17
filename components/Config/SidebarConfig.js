import { FaEnvelope } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { FaNewspaper } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBox } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { FaTrademark } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';


const SidebarConfig = {

    ADMIN : [
        {id: 'subElement_1', name: "Distributors", icon: FaTruck,isExpand: false, 
            items: [
                {id:'subElement_1-item_1', name: 'Manage Distributors', isActive: false, pathname: '/dashboard/manageDistributors'}            
            ]
        },
        {id: 'subElement_2', name: "Executive", icon: FaUserTie,isExpand: false, 
            items: [
                {id:'subElement_2-item_1', name: 'Manage Executives', isActive: false, pathname: '/dashboard/manageExecutives'}
            ]
        },
        {id: 'subElement_3', name: "Channel Partner", icon: FaHandshake,isExpand: false, 
            items: [
                {id:'subElement_3-item_1', name: 'Manage Channel Partners', isActive: false, pathname: '/dashboard/manageChannelPartners'}
            ]
        },
        {id: 'subElement_4', name: "Subscriptions", icon: FaNewspaper,isExpand: false, 
            items: [
                {id:'subElement_4-item_1', name: 'Manage Subscriptions', isActive: false, pathname: '/dashboard/manageSubscriptions'}
            ]
        },
        {id: 'subElement_5', name: "Shops", icon: FaStore,isExpand: false, 
            items: [
                {id:'subElement_5-item_1', name: 'Manage Shops', isActive: false, pathname: '/dashboard/manageShops'}
            ]
        },
        {id: 'subElement_6', name: "Order", icon: FaShoppingCart,isExpand: false, 
            items: [
                {id:'subElement_6-item_1', name: 'Manage Orders', isActive: false, pathname: '/dashboard/manageOrders'}
            ]
        },
        {id: 'subElement_7', name: "Product", icon: FaBox,isExpand: false, 
            items: [
                {id:'subElement_7-item_1', name: 'View Products', isActive: false, pathname: '/dashboard/viewProducts'}
            ]
        }
    ],
    BDM :[
        {id: 'subElement_1', name: "Sub Two", icon: FaCog,isExpand: false, items: [
            {id:'subElement_1-item_3', name: 'Item Three', isActive: false, pathname: '/dashboard/pageThree'}
        ]}
    ],
    DISTRIBUTOR :[
        {id: 'subElement_1', name: "Shops", icon: FaStore,isExpand: false, 
            items: [
                {id:'subElement_1-item_1', name: 'Manage Shops', isActive: false, pathname: '/distributor/manageShops'}
            ]
        },
        {id: 'subElement_2', name: "Executives", icon: FaUserTie,isExpand: false, 
            items: [
                {id:'subElement_2-item_1', name: 'Manage Executives', isActive: false, pathname: '/distributor/manageExecutives'}
            ]
        },
        {id: 'subElement_3', name: "Products", icon: FaBox,isExpand: false, 
            items: [
                {id:'subElement_3-item_1', name: 'Manage Products', isActive: false, pathname: '/distributor/viewProducts'}
            ]
        },
        {id: 'subElement_4', name: "Brands", icon: FaTags,isExpand: false, 
            items: [
                {id:'subElement_4-item_1', name: 'Manage Brands', isActive: false, pathname: '/distributor/manageBrands'}
            ]
        },
        {id: 'subElement_5', name: "Orders", icon: FaShoppingCart,isExpand: false, 
            items: [
                {id:'subElement_5-item_1', name: 'Manage Orders', isActive: false, pathname: '/distributor/manageOrders'}
            ]
        },
        {id: 'subElement_6', name: "Info", icon: FaInfoCircle,isExpand: false, 
            items: [
                {id:'subElement_6-item_1', name: 'Info', isActive: false, pathname: '/distributor/info'}
            ]
        }
    ],
    CHANNEL_PARTNER:[
        {id: 'subElement_1', name: "Distributors", icon: FaTruck,isExpand: false, 
            items: [
                {id:'subElement_1-item_1', name: 'Manage Distributors', isActive: false, pathname: '/channelPartner/manageDistributors'}
            ]
        },
        {id: 'subElement_2', name: "Info", icon: FaInfoCircle,isExpand: false, 
            items: [
                {id:'subElement_2-item_1', name: 'View Info', isActive: false, pathname: '/channelPartner/info'}
            ]
        }
    ]  

}


export default SidebarConfig;