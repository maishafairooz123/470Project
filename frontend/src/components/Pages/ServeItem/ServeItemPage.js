import { useParams, useNavigate} from 'react-router-dom';
import { serveItem } from '../../../Services/orderService';
import { toast } from "react-toastify";
import { useEffect } from 'react';


export default function ServeItemPage() {

  const navigate = useNavigate();
  const { orderId, itemFoodId } = useParams();

  useEffect(() => {
    const serveItemAndNavigate = async () => {
      try {
        const test = await serveItem(orderId, itemFoodId);
        toast.success("Item Served");
        navigate('/ordersadmin');
      }
      catch(error) {
        console.error("Error while Serving Item:", error);
        toast.error("An error occurred while Serving the Item");
        navigate('/ordersadmin');
      }
    }
  
    serveItemAndNavigate();
  }, [orderId, itemFoodId, navigate]);

  return null;
}
