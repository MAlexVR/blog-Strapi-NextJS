// Footer.js
"use client";

const menuItems = [
  {
    name: "Nosotros",
    submenu: [
      { name: "¿Quiénes somos?", href: "#" },
      { name: "Misión y visión", href: "#" },
      { name: "Objetivos", href: "#" },
      { name: "Proyectos", href: "#" },
      { name: "Gestión del conocimiento", href: "#" },
    ],
  },
  {
    name: "Eventos",
    submenu: [
      { name: "Ciclo de talleres Proyecta", href: "#" },
      { name: "Eventos pasados", href: "#" },
    ],
  },
  {
    name: "Servicios",
    submenu: [
      { name: "Portafolio de servicios", href: "#" },
      { name: "Laboratorio de Servicios Unificados - LSU", href: "#" },
      { name: "Laboratorio de Ensayos para Paneles Solares - LEPS", href: "#" },
      { name: "Centro de Regeneración de Gases Refrigerantes", href: "#" },
      { name: "Solicitud de servicios", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              className="h-7"
              src="/placeholder.svg?height=28&width=84"
              alt="Logo del Grupo de Investigación"
            />
            <p className="text-sm leading-6 text-gray-300">
              Innovando y generando conocimiento para un futuro mejor.
            </p>
            <div className="flex space-x-6">{/* Redes Sociales */}</div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Nosotros
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {menuItems[0].submenu.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Eventos
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {menuItems[1].submenu.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Servicios
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {menuItems[2].submenu.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Política de privacidad
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Términos de uso
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2023 Grupo de Investigación. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
