import React from 'react'
import "./Footer.css"
function Footer() {
    return (
        <footer>
            <div class="footer__main-content">
                <div class="footer__left">
                    <h2 className="footer__title">
                       Sobre Nosotros
                    </h2>
                    <div class="footer__content">
                        Oficios Changas Rosario nace con el objetivo de unir profesionales de un determinado oficio con personas que tengan un trabajo corto para ofrecer en sus hogares ("changas" como se le dice en Argentina) 
                    </div>
                </div>
                <div class="footer__right">
                    <span className="footer__rightText">Seguinos en </span>
                    <span className="footer__iconBack"><i class="footer__icon fab fa-instagram"></i></span> 
                    </div>
            </div>
        </footer>
    )
}

export default Footer
