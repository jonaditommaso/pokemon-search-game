import { Carousel } from 'react-bootstrap';
import '../../styles/home.css';

const Home = () => {
    return (
        <div className="home">
                <Carousel 
                    interval={8000} 
                    style={{backgroundColor: '#EB2D0C', borderRadius: '15px', opacity: '0.9'}}
                    variant="dark"
                >
                    <Carousel.Item>
                        <div className="home__containerImg">
                            <img
                                src="/assets/img/pikachu1.png" 
                                alt="pikachu" 
                                style={{width: '250px', height: '250px', marginTop: '1%'}}
                            />
                        </div>
                        <div className="home__text">
                            <h3>Hi! Welcome to the Pokémon world</h3>
                            <h6>Here you'll can see all the Pokémon, know their data, and listen to them!</h6>
                            <h6>(You can turn on and pause the music as you please).</h6>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item >
                        <div className="home__containerImg">
                            <img
                                src="/assets/img/pikachu2.png" 
                                alt="pikachu" 
                                style={{width: '250px', height: '250px', marginTop: '2%'}}
                            />
                        </div>
                        <div className="home__text">
                            <h3>Login and go to the POKEDEX</h3>
                            <h6><span style={{fontStyle: 'italic'}}>See all Pokémons</span> will show you a detailed list of the Pokemons.</h6>
                            <h6><span style={{fontStyle: 'italic'}}>Search Pokemon</span> will allow you to search for a pokemon by name or number and listen to its description.</h6>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item >
                        <div className="home__containerImg">
                            <img
                                src="/assets/img/pikachu3.png" 
                                alt="pikachu" 
                                style={{width: '250px', height: '250px', marginTop: '2%'}}
                            />
                        </div>
                        <div className="home__text">
                            <h3>Choose a pokemon and fight!</h3>
                            <h6>In <span style={{fontStyle: 'italic'}}>Search Pokemon</span> you can choose a Pokémon and fight with it.</h6>
                            <h6>Fight, win, and catch them now!</h6>
                        </div>
                    </Carousel.Item>
                </Carousel>
        </div>
    );
}
 
export default Home;