import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    // ArrowPathIcon,
    Bars3Icon,
    // ChartPieIcon,
    // CursorArrowRaysIcon,
    // FingerPrintIcon,
    // SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { BsFillPersonFill } from 'react-icons/bs'
import logo from '../assets/logo.png'

import { LoginLink, LogoutLink } from './Auth/CommonLinks'

/* const aboutDetails = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customersp data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
] */
const callsToAction = [
    { name: 'Watch demo', href: '', icon: PlayCircleIcon },
    { name: 'Contact us', href: '/about', icon: PhoneIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar({ type, email }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-none text-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href={type === "loggedin" ? "/home" : "/"} className="-m-1.5 p-1.5">
                        <span className="sr-only">OneResume</span>
                        <img className="h-8 w-auto" src={logo} alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <a href={type === "loggedin" ? "/home" : "/"} className="text-sm font-semibold leading-6">
                        Home
                    </a>

                    <Popover className="relative">
                        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6">
                            About
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-[#191919] shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    <div
                                        className="group relative flex items-start gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-[#202020]"
                                    >
                                        {/* <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#202020] group-hover:bg-[#191919]">
                                            <BiTargetLock className="h-6 w-6 text-gray-600" aria-hidden="true" />
                                        </div> */}
                                        <div className="flex-auto">
                                            <a href="/about" className="block font-semibold">
                                                Aim
                                                <span className="absolute inset-0" />
                                            </a>
                                            <p className="mt-1 text-gray-600">
                                                Users can upload updated resumes without having to generate new links or create copies.
                                                Removes the risk of the old link breaking, the same link shows the new file.
                                                Built with ReactJs, Nodejs, and Firebase for authentication and storage.
                                            </p>
                                        </div>
                                    </div>
                                    {/* {aboutDetails.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-[#202020]"
                                        >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#202020] group-hover:bg-[#191919]">
                                                <item.icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                                            </div>
                                            <div className="flex-auto">
                                                <a href={item.href} className="block font-semibold">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))} */}
                                </div>

                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-[#202020]">
                                    {callsToAction.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 hover:bg-[#222222]"
                                        >
                                            <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    {/* <a href="#" className="text-sm font-semibold leading-6">
                        Features
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6">
                        Marketplace
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6">
                        Company
                    </a> */}
                </Popover.Group>
                {
                    type === "loggedin" &&
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Popover className="relative">
                            <Popover.Button className="flex items-center gap-x-1 text-sm leading-6">
                                {email}
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute right-0 top-full z-10 mt-3 w-screen max-w-[25vw] overflow-hidden rounded-3xl bg-[#191919] shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        <div
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-[#202020]"
                                        >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[#202020] group-hover:bg-[#191919]">
                                                <BsFillPersonFill className="h-6 w-6 text-gray-600" aria-hidden="true" />
                                            </div>
                                            <div className="flex-auto">
                                                <a href={type === "loggedin" ? "/home/profile" : "/"} className="block font-semibold">
                                                    Profile
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600">Edit profile</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-[#202020]">
                                        {/* eslint-disable-next-line */}
                                        <LogoutLink style="rounded-es-3xl flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 hover:bg-[#222222]" />
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                        {/* <LogoutLink style="text-sm font-semibold leading-6" /> */}
                    </div>
                }
                {
                    type === "loggedout" &&
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end text-[rgba(0,0,0,0)]">
                        {/* eslint-disable-next-line */}
                        <LoginLink style="text-sm font-semibold leading-6" />
                    </div>
                }
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#191919] text-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href={type === "loggedin" ? "/home" : "/"} className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src={logo}
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href={type === "loggedin" ? "/home" : "/"}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                                >
                                    Home
                                </a>
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7">
                                                About
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                <Disclosure.Button
                                                    as="a"
                                                    href="/about"
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7"
                                                >
                                                    Aim
                                                </Disclosure.Button>
                                                {[/* ...aboutDetails, */ ...callsToAction].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                {/* <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                                >
                                    Company
                                </a> */}
                                {
                                    type === "loggedin" &&
                                    <a
                                        href={type === "loggedin" ? "/home/profile" : "/"}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                                    >
                                        Profile
                                    </a>
                                }
                            </div>
                            {
                                type === "loggedin" &&
                                <div className="py-6">
                                    {/* eslint-disable-next-line */}
                                    <LogoutLink style="w-full bg-[#202020] block rounded-lg px-3 py-2.5 text-base font-semibold leading-7" />
                                </div>
                            }
                            {
                                type === "loggedout" &&
                                <div className="py-6">
                                    {/* eslint-disable-next-line */}
                                    <LoginLink style="w-full bg-[#202020] block rounded-lg px-3 py-2.5 text-base font-semibold leading-7" />
                                </div>
                            }
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
