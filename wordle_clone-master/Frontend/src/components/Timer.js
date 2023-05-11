import { useState } from "react";

function Timer(){
    const [count, setCount] = useState(0);
    
	setTimeout(() => {
		setCount(count + 1);
	}, 1000);
   
	return (
        <div className="timerBox">
		<section className="counter">
			
			<h1>{count} s</h1>
			
		</section>
        </div>
	);
}

export default Timer;