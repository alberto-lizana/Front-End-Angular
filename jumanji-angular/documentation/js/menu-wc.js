'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">jumanji-angular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/Acordeon.html" data-type="entity-link" >Acordeon</a>
                            </li>
                            <li class="link">
                                <a href="components/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/Card.html" data-type="entity-link" >Card</a>
                            </li>
                            <li class="link">
                                <a href="components/Carrito.html" data-type="entity-link" >Carrito</a>
                            </li>
                            <li class="link">
                                <a href="components/CarritoPage.html" data-type="entity-link" >CarritoPage</a>
                            </li>
                            <li class="link">
                                <a href="components/Dashboard.html" data-type="entity-link" >Dashboard</a>
                            </li>
                            <li class="link">
                                <a href="components/Footer.html" data-type="entity-link" >Footer</a>
                            </li>
                            <li class="link">
                                <a href="components/FormCrearProducto.html" data-type="entity-link" >FormCrearProducto</a>
                            </li>
                            <li class="link">
                                <a href="components/FormCrearUsuario.html" data-type="entity-link" >FormCrearUsuario</a>
                            </li>
                            <li class="link">
                                <a href="components/FormModificarProducto.html" data-type="entity-link" >FormModificarProducto</a>
                            </li>
                            <li class="link">
                                <a href="components/FormModificarUsuario.html" data-type="entity-link" >FormModificarUsuario</a>
                            </li>
                            <li class="link">
                                <a href="components/FormRecuperarContrasena.html" data-type="entity-link" >FormRecuperarContrasena</a>
                            </li>
                            <li class="link">
                                <a href="components/Home.html" data-type="entity-link" >Home</a>
                            </li>
                            <li class="link">
                                <a href="components/ImgCategorias.html" data-type="entity-link" >ImgCategorias</a>
                            </li>
                            <li class="link">
                                <a href="components/InicioSesion.html" data-type="entity-link" >InicioSesion</a>
                            </li>
                            <li class="link">
                                <a href="components/KpiCard.html" data-type="entity-link" >KpiCard</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginBox.html" data-type="entity-link" >LoginBox</a>
                            </li>
                            <li class="link">
                                <a href="components/Menu.html" data-type="entity-link" >Menu</a>
                            </li>
                            <li class="link">
                                <a href="components/Modal.html" data-type="entity-link" >Modal</a>
                            </li>
                            <li class="link">
                                <a href="components/Nav.html" data-type="entity-link" >Nav</a>
                            </li>
                            <li class="link">
                                <a href="components/Presentacion.html" data-type="entity-link" >Presentacion</a>
                            </li>
                            <li class="link">
                                <a href="components/TablaProductos.html" data-type="entity-link" >TablaProductos</a>
                            </li>
                            <li class="link">
                                <a href="components/TablaUsuarios.html" data-type="entity-link" >TablaUsuarios</a>
                            </li>
                            <li class="link">
                                <a href="components/ThemeSwitch.html" data-type="entity-link" >ThemeSwitch</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/FormUtils.html" data-type="entity-link" >FormUtils</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarritoService.html" data-type="entity-link" >CarritoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriaService.html" data-type="entity-link" >CategoriaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CrearUsuarioService.html" data-type="entity-link" >CrearUsuarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DivisaService.html" data-type="entity-link" >DivisaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModificarUsuarioService.html" data-type="entity-link" >ModificarUsuarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductoService.html" data-type="entity-link" >ProductoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecuperarContrasenaService.html" data-type="entity-link" >RecuperarContrasenaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioService.html" data-type="entity-link" >UsuarioService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DivisaInterface.html" data-type="entity-link" >DivisaInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Estadisticas.html" data-type="entity-link" >Estadisticas</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemCarrito.html" data-type="entity-link" >ItemCarrito</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModificarProducto.html" data-type="entity-link" >ModificarProducto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PresentacionCategoria.html" data-type="entity-link" >PresentacionCategoria</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Producto.html" data-type="entity-link" >Producto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductoRequest.html" data-type="entity-link" >ProductoRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuariosResponse.html" data-type="entity-link" >UsuariosResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});