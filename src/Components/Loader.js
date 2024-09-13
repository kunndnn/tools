import "../Styles/Loader.css";
import { useState } from "react";

function Loader() {
  const [loading, setLoading] = useState(false); // Start with loader hidden

  const handleToggleLoader = () => {
    setLoading(true); // Show loader initially

    setTimeout(() => {
      setLoading(false); // Hide loader after 3 seconds
    }, 3000);
  };

  return (
    <>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
        perferendis placeat incidunt cupiditate obcaecati laudantium saepe
        mollitia laborum, sed corrupti necessitatibus distinctio magni quas
        ipsam, alias esse, voluptatum harum officiis? Deleniti, ipsa explicabo?
        Ducimus, sint? Eum nobis expedita ipsum eius, possimus libero eaque
        numquam! Dolor hic a exercitationem facere facilis. Est ducimus labore
        minus saepe ut dicta odit totam consequuntur! Consectetur quibusdam illo
        debitis quod aliquam nulla optio iusto, dolorem laudantium facere
        architecto atque est asperiores quis. Deleniti, dolorem natus molestiae
        doloremque, esse quos quo quod voluptates repellat velit saepe. Natus,
        doloremque pariatur. Itaque in quam praesentium veritatis ea autem illum
        quaerat maiores voluptatum harum ab tenetur, accusamus obcaecati
        repudiandae consectetur perspiciatis reiciendis. Velit nesciunt debitis
        sint laborum voluptates consectetur. Accusamus fuga itaque placeat
        corrupti vel. Dignissimos voluptatibus ipsam sunt, iure impedit
        consequuntur. A veniam nemo, optio nesciunt rem illo aspernatur, ad
        consequatur reiciendis eligendi odit placeat tempora earum officia? Est
        ea, tempore officiis qui voluptatum doloremque veniam velit quis at
        praesentium similique impedit, beatae facilis eaque, cumque hic
        perspiciatis assumenda? Nisi, facere consequuntur. Quo quod cupiditate
        reprehenderit aut maiores. Ab, laboriosam eum! Maiores animi
        reprehenderit magni eaque nesciunt nostrum consectetur veritatis?
        Reiciendis nobis aliquam nemo nisi cupiditate assumenda accusamus,
        veritatis similique ullam libero tempore, saepe, praesentium doloribus
        ipsum voluptates. Nesciunt vel recusandae est vero, mollitia nihil eius
        cupiditate laborum nam placeat dignissimos natus quae esse nostrum
        quidem quam sint dicta consequatur voluptas perspiciatis ex? Fuga
        laboriosam ipsum voluptatibus eos. Ratione atque optio non repellendus
        laudantium fugiat laboriosam molestiae ducimus placeat excepturi sit
        nostrum recusandae, asperiores error perspiciatis consequuntur ab labore
        aut nam aliquam rem eveniet veritatis amet magnam. Autem? Suscipit,
        consectetur quod odit rerum dicta rem quibusdam magni perferendis eum
        sit quam ad molestiae, facilis unde culpa ab exercitationem distinctio
        blanditiis facere nostrum natus quas ea vero quaerat. Esse!
        {loading && (
          <div id="loader">
            <div className="spinner"></div>
          </div>
        )}
        <br />
        <button onClick={handleToggleLoader}>Toggle Loader</button>
      </div>
    </>
  );
}

export default Loader;
