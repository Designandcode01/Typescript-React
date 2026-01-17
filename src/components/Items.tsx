export type ItemsProps = {
    
    name?: string;
    price?: number;
    isAvailable?: boolean; // Fixed spelling
    categories?: string[];
}


const Items = ({ name="AI", price=0.0000000, isAvailable=true, categories=[] }: ItemsProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Available: {isAvailable ? "Yes" : "No"} </p>
      {/* {isAvailable ? "Yes" : "No"} */}
      <p>Categories: {categories.join(", ")}</p>
    </div>
  )
}




// const Items: React.FC<ItemsProps> = ({ id, name, price, isAvailable }) => {
//   return (
//     <div className="item">
//       <h3>{name}</h3>
//       <p>ID: {id}</p>
//       <p>Price: ${price.toFixed(2)}</p>
//       <p className={isAvailable ? "in-stock" : "out-of-stock"}>
//         {isAvailable ? "✅ In Stock" : "❌ Out of Stock"}
//       </p>
//     </div>
//   )
// }
export default Items;