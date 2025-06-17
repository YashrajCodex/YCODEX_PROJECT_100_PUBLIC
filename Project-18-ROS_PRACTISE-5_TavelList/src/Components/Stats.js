const Stats = ({ listedItems }) => {
    if (!listedItems.length)
      return (
        <footer className="stats">
          <em>Start packing your items 📦.</em>
        </footer>
      );
    const itemsPacked = listedItems.filter((fItems) => fItems.packed).length;
    const itemsPercent = Math.round((itemsPacked / listedItems.length) * 100);
    return (
      <footer className="stats">
        {itemsPercent === 100 ? (
          <em>You have everything! Ready to go🛫</em>
        ) : (
          <em>
            👜You have {listedItems.length} items on your list, and you already
            packed {itemsPacked} or ({itemsPercent}%)
          </em>
        )}
      </footer>
    );
  };

  export default Stats;