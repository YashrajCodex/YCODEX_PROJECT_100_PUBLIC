import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

export default function DeleteItem({pizzaId}) {
    const dispatch = useDispatch()
  return (
    <div>
      <Button type="small" onClick={()=> dispatch(deleteItem(pizzaId))}>Delete</Button>
    </div>
  )
}
