export const CustomButton = () => {

    const handleClick = () => {
        alert("Thank You for liking");
    }

    return <button onClick={handleClick}>Like</button>
}