import { useNavigate, Outlet, useOutletContext } from "react-router-dom"
import "./ItemCard.css"

function ItemCard( {item} ) {
    const {setItems, items} = useOutletContext()
    const navigate = useNavigate();

    function handleEdit() { navigate("./EditPage", {state: {item}})}
    function handleDelete() {
        fetch(`http://localHost:3000/items/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        })
            .then(r => r.json())
            .then(() => setItems(items.filter((thisItem) => thisItem.id !== item.id)))
    }

    return (
        <div className="ItemCard">
            <div className="item-header">
                <button onClick={handleEdit} className="edit-button">🖉</button>
                <button onClick={handleDelete} className="remove-button">🗑</button>
                <h2 className="item-name inline">{item.name}</h2>
                <h3 className="item-price inline">${item.price}</h3>
            </div>
            <img className="item-image" src={item.image} alt="Unavailable" />
            <p className="item-description">{item.description}</p>
            <Outlet />
        </div>
    )
}

export default ItemCard