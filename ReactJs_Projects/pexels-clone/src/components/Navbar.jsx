import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ setSearch }) => {
    const showMenu = () => {
        document.getElementById("mobile-menu").classList.toggle("hidden");
    }
    return (
        <>
        {/* Navbar */}
            <nav className="bg-gray-800 p-4 fixed top-0 w-full z-[10]">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <a href="#" className="text-white text-xl font-bold">Pexel Clone_2.0</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex space-x-4">
                            <Link to="/" className='text-white font-bold'>Images</Link>
                            <Link to="/videos" className='text-white font-bold'>Videos</Link>
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button className="text-white focus:outline-none" id="menu-toggle" onClick={showMenu}>
                            <svg xmlns="http://www.w3.org/1000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4 6h16a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4zm0 7h16a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4zm0 7h16a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="md:hidden hidden" id="mobile-menu">
                    <ul className="flex flex-col items-center mt-4">
                        <Link to="/" className='text-white font-bold'>Images</Link>
                        <Link to="/videos" className='text-white font-bold'>Videos</Link>
                    </ul>
                </div>
            </nav>

            {/* Search bar for pictures and videos */}
            <div className='flex justify-center md:mt-[8%] mt-[20%] z-[10]'>
                <input type="text" className='md:w-[80vh] px-4 py-2 rounded-lg'
                    onChange={(e) => {
                        setSearch('nnnnnnnnn'); setTimeout(() => {
                            e.target.value !== "" ? setSearch(e.target.value) : setSearch('nature')
                        }, 1000);
                    }}
                    placeholder='Nature' />
            </div>

            {/* Categories buttons of pictures and videos from API's */}
            <div className='mt-2 text-center'>
                <button className='btn bg-white rounded-md px-2 py-1 my-1 mx-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('nature');
                    }, 1000);
                }}>Nature</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1' onClick={() => {
                    setSearch('nnnnnnnnn');
                    setTimeout(() => {
                        setSearch('travel')
                    }, 1000);
                }}>Travel</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1 mx-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('animals')
                    }, 1000);
                }}>Animals</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('cars')
                    }, 1000);
                }}>Cars</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1 mx-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('fashion')
                    }, 1000);
                }}>Fashion</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('technology')
                    }, 1000);
                }}>Technology</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1 mx-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('finance')
                    }, 1000);
                }}>Business & Finance</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('flowers')
                    }, 1000);
                }}>Flowers</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1 mx-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('programming')
                    }, 1000);
                }}>Programming</button>
                <button className='btn bg-white rounded-md px-2 py-1 my-1' onClick={() => {
                    setSearch('nnnnnnnnnn');
                    setTimeout(() => {
                        setSearch('health')
                    }, 1000);
                }}>Health</button>
            </div>

        </>
    )
}

export default Navbar
