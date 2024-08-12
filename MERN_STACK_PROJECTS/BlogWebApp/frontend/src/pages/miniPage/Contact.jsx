import React from 'react'

const Contact = () => {
  return (
    <div className='my-5 w-[90%] bg-blue-300 flex flex-col mx-auto rounded-lg items-center md:gap-14 gap-8'>
      <h1 className='my-5 md:text-4xl text-2xl font-semibold underline'>Contact Us</h1>
      <h2 className='md:text-2xl text-xl font-semibold text-center mx-2'>You can contact through below these information </h2>
      <section className="py-1 w-[100%] md:w-[80%] bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-blue-200 w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-blueGray-700 text-xl text-center underline">Contact Information</h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-black border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Contact
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-black border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Contact Details
                    </th>
                  </tr>
                </thead>

                <tbody>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          Whats-App
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          +92-3183047011
                        </td>
                      </tr>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          Email
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <a className='text-blue-700' target='_blank' href="https://mail.google.com/mail/u/0/#search/azhars2109%40gmail.com">azhars2109@gmail.com</a>
                        </td>
                      </tr>
                      <tr>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          Linkedin
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <a className='text-blue-700' target='_blank' href="https://www.linkedin.com/in/muhammad-azhar-32b09024b/">https://www.linkedin.com/in/muhammad-azhar-32b09024b/</a>
                        </td>
                      </tr>
                </tbody>

              </table>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}

export default Contact
