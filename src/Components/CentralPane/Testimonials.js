import React from "react";
import './Testimonials.css';

export default function Testimonials(){
    return(
        <>           
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                    <li data-target="#myCarousel" data-slide-to="4"></li>                    
                </ol>
                <div className="carousel-inner" >

                    <div className="item active">
                        <img src={require(`./images/reviews/t1.JPG`)} alt="Testimonials" className="center" />
                    </div>

                    <div className="item">
                        <img src={require(`./images/reviews/t2.JPG`)} alt="Testimonials" className="center" />
                    </div>
            
                    <div className="item">
                        <img src={require(`./images/reviews/t3.JPG`)} alt="Testimonials" className="center" />
                    </div>

                    <div className="item">
                        <img src={require(`./images/reviews/t4.JPG`)} alt="Testimonials" className="center" />
                    </div>

                    <div className="item">
                        <img src={require(`./images/reviews/t5.JPG`)} alt="Testimonials" className="center" />
                    </div>
                </div>
                <a className="carousel-control left" href="#myCarousel" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control right" href="#myCarousel" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a> 
            </div>
        </>
    )
    
}