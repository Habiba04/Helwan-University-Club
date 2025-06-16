import './Home.css'

const Home = () => {
    
    return (
        <div className='home' id="top" >
            <div className="slideshow p-0 m-0 w-100">
                <div id="carouselExampleAutoplaying" className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="2500"
                    data-bs-pause="false"
                >
            <div className="carousel-inner p-0 m-0 w-100" style={{height:"85vh"}}>
            <div className="carousel-item active">
                <img src="/assets/slide1.jpg" className="d-block w-100" alt="slide1" />
            </div>
            <div className="carousel-item">
                <img src="/assets/slide2.jpg" className="d-block w-100" alt="slide2" />
            </div>
            <div className="carousel-item">
                <img src="/assets/slide3.jpg" className="d-block w-100" alt="slide3" />
            </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
            <div id="about" className="about d-flex flex-column align-items-center py-5 fs-4" dir='rtl'>
                <h1 className='pb-5'style={{color:"#224375"}}>من نحن</h1>
                <p >مرحبًا بكم في <span style={{fontStyle:"italic",fontWeight:"bold"}}>نادي جامعة حلوان!</span></p>
                <p >
                حيث تلتقي الرياضة بالمتعة والتكنولوجيا! </p>
                <p className='text-center' style={{maxWidth:"60%"}}> نهدف إلى تقديم تجربة نادي ذكية وسلسة من خلال العضوية الرقمية، الدخول عبر بطاقة RFID، حجز الأنشطة، نظام النقاط، وغيرها من الخدمات المميزة. </p>
                <p className='text-center' style={{maxWidth:"60%"}}> سواء كنت تمارس الرياضة، تستأجر معدات، أو تستمتع بوقتك مع الأصدقاء، فنادي HUC هو وجهتك المثالية لحياة جامعية نشيطة وممتعة.</p>
            </div>
                <div className="break py-5">
                    <div>
                        <div className="tilted-wrapper">
                            <img
                            loading='lazy'
                            src="/assets/track.jpg"
                            alt="Running track"
                            className="tilted-image"
                            />
                        </div>
                    </div>
                </div>            
                <div id="activities" className="gallery d-flex flex-column align-items-center py-5 fs-4">
                <h1 className='pb-5'style={{color:"#224375"}}>أنشطة النادي</h1>
                <div className='container'>
                    <div className="box">
                        <div className="image">
                            <img loading='lazy' src="/assets/act1.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img loading='lazy' src="/assets/act2.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img loading='lazy' src="/assets/act3.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img loading='lazy' src="/assets/act4.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img loading='lazy' src="/assets/act5.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img loading='lazy' src="/assets/act6.jpeg" alt="" />
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="features d-flex flex-column align-items-center py-5 fs-4" dir='rtl'>
                <h1 className='pb-5'style={{color:"#224375"}}>أنشطة النادي</h1>
                <div className='container'>
                <div className="card mb-3 border-0" style={{maxWidth: "100%"}}>
                    <div className="row g-0">
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">الدخول الذكي بتقنية RFID</h5>
                            <p className="card-text">ادخل بلمسة واحدة!</p>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <img loading='lazy' src="/assets/feat1.png" className="img-fluid rounded-start" alt="RFID"/>
                        </div>
                    </div>
                </div>
                <div className="card mb-3 border-0" style={{maxWidth: "100%"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img loading='lazy' src="/assets/feat2.png" className="img-fluid rounded-start" alt="RFID"/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">الحجز عبر الإنترنت</h5>
                            <p className="card-text">احجز الأنشطة في أي وقت!</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-3 border-0" style={{maxWidth: "100%"}}>
                    <div className="row g-0">
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">نظام المكافآت</h5>
                            <p className="card-text">اكسب نقاطًا لكل حركة!</p>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <img loading='lazy' src="/assets/feat3.jpeg" className="img-fluid rounded-start" alt="RFID"/>
                        </div>
                    </div>
                </div>
                <div className="card mb-3 border-0" style={{maxWidth: "100%"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img loading='lazy' src="/assets/feat4.jpeg" className="img-fluid rounded-start" alt="RFID"/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">تطبيق الهاتف</h5>
                            <p className="card-text">تنزيل التطبيق لتجربة أفضل!</p>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home
