import { useEffect } from "react";

const Quote = () => {
    useEffect(() => {
      fetch("")
        .then((res) => res.json())
        .then((json) => {
         console.log({json})
        });
    console.log("boom");
  }, []);
  return <>Quote</>;
};

export default Quote;
