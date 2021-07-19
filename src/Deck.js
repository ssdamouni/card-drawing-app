import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from './Card'

const Deck = () => {
    let DECK_ID = useRef();
    const timerRef = useRef(null);
    const [deck, setDeck] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);

    const draw = newCard => {
        setDeck(deck => [...deck, newCard]);
      };
      
        useEffect(() => {
            async function getDeck() {
                axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(res => {
                    DECK_ID.current = res.data.deck_id});
                    console.log(DECK_ID)
                }
            getDeck()
        }, [setDeck]);
        
        useEffect(() => {
        async function onClick(){
            if(deck.length === 51){
                setAutoDraw(false)
                return alert("Err: There are no cards left!")
            }
            let res = await axios.get(`http://deckofcardsapi.com/api/deck/${DECK_ID.current}/draw/?count=1`)
            let card = res.data.cards[0]
            draw(card)
        }
        if(autoDraw){
            timerRef.current = setInterval(async () => {
                await onClick();
              }, 1000);
        }
        
        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
          };
    }, [autoDraw, deck])
    const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto);
      };
    return(
        <div>
            <button onClick={toggleAutoDraw}>Auto Draw!</button>
            {deck.map(card =>{
                return(    
                    <Card key={card.code} id={card.code} img={card.image} value={card.value} suit={card.suit} />
                )
            })}
        </div>
    )
}

export default Deck;