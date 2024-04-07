import { useParams, useNavigate} from 'react-router-dom';
import { approveOrder } from '../../../Services/orderService';
import { toast } from "react-toastify";
import { useEffect } from 'react';


export default function ApproveOrderPage() {

  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    const approveOrderAndNavigate = async () => {
      try {
        const test = await approveOrder(orderId);
        toast.success("Order Approved");
        navigate('/ordersadmin');
      }
      catch(error) {
        console.error("Error while approving order:", error);
        toast.error("An error occurred while approving the order");
        navigate('/ordersadmin');
      }
    }
  
    approveOrderAndNavigate();
  }, [orderId, navigate]);

  return null;
}
