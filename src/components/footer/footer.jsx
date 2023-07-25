 import classes from './footer.module.css';

const Footer = () =>{
    return (
        <footer className={classes.footer}>
            <div className={classes.wrapper}>
                <div className={classes.col}>
                    <h2>About the App</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo similique fugiat pariatur maxime iure eligendi corrupti dolorem cum natus enim vel dignissimos, vitae sed expedita laboriosam officiis veritatis cumque sint.</p>
                    
                </div>
                <div className={classes.col}>
                 <h2>Contacts</h2>   
                 <span>Phone 09905085012</span>
                 <span>Youtube: WebDevMania</span>
                 <span>Github: WebDevMania</span>
                </div>
                <div className={classes.col}>
                    <h2>Location</h2>
                    <span>Continent: Europe</span>
                    <span>Country: Bulgaria</span>
                    <span>Current Location: Bulgaria</span>
                </div>
            </div>

        </footer>
    )
}

export default Footer;