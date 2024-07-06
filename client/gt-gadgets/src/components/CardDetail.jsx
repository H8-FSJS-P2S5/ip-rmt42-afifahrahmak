export const CardDetail = ({ gadget }) => {
    let categoryBadge = ``;
    
    switch (gadget.Category.name) {
        case 'apple':
            categoryBadge = <i className="fa-solid fa-hotdog"></i>;
            break;

        case 'samsung':
            categoryBadge = <i className="fa-solid fa-bowl-rice"></i>;
            break;

        case 'xiaomi':
            categoryBadge = <i className="fa-solid fa-cookie-bite"></i>;
            break;

        case 'oppo':
            categoryBadge = <i className="fa-solid fa-mug-hot"></i>;
            break;

        default:
            break;
    }


    return (
        <div className="card card_menu_detail" style={{ width: '86rem', height: '420px', borderRadius: '20px' }}>
            <div className="card-body">
                <div className="row mt-3">
                    <div className="col-4 mx-4">
                        <div>
                            <img className="img-fluid"
                                alt="" srcSet={gadget.imgUrl} />
                            
                        </div>
                    </div>
                    <div className="col-7">
                        <h2 className="card-title text-center "><span className="product_title">{gadget.name}</span></h2>
                        <h6 className="card-subtitle mb-2 text-body-secondary text-center"><i>-- GT GADGET --</i></h6>
                        <div className="product_spec">
                            {console.log(gadget)}
                           <p>{gadget.Spec.weight}</p> 
                           <p> {gadget.Spec.display} </p>
                           <p>   {gadget.Spec.os}</p>
                           <p>   {gadget.Spec.chipset}</p>
                           <p>   {gadget.Spec.memory}</p>
                           <p>  {gadget.Spec.battery}</p>
                        </div>
                        <div>
                            <p className="badge rounded-pill badge_category">{categoryBadge} {gadget.Category.name}
                            </p>
                        </div>
                        <div>
                            <q>{gadget.description}</q>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}