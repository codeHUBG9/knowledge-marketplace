
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaDiscord, 
  FaGithub, 
  FaTwitter, 
  FaLinkedin,
  FaEnvelope,
  FaQuestionCircle,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Platform",
            links: [
                { name: "How it Works", href: "/how-it-works" },
                { name: "Browse Questions", href: "/questions" },
                { name: "Find Experts", href: "/experts" },
                { name: "Pricing", href: "/pricing" },
                { name: "Success Stories", href: "/stories" }
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Help Center", href: "/help" },
                { name: "Contact Us", href: "/contact" },
                { name: "FAQ", href: "/faq" },
                { name: "Community Guidelines", href: "/guidelines" },
                { name: "Report Issue", href: "/report" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Press", href: "/press" },
                { name: "Blog", href: "/blog" },
                { name: "Partnerships", href: "/partnerships" }
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Refund Policy", href: "/refunds" },
                { name: "Expert Agreement", href: "/expert-terms" }
            ]
        }
    ];

    const socialLinks = [
        { icon: FaTwitter, href: "https://twitter.com/knowledge-marketplace", color: "hover:text-blue-400" },
        { icon: FaLinkedin, href: "https://linkedin.com/company/knowledge-marketplace", color: "hover:text-blue-600" },
        { icon: FaGithub, href: "https://github.com/codeHUBG9/knowledge-marketplace", color: "hover:text-gray-800" },
        { icon: FaDiscord, href: "https://discord.gg/knowledge-marketplace", color: "hover:text-purple-600" }
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <FaQuestionCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-white">Knowledge</span>
                                <span className="text-2xl font-bold text-blue-400 ml-1">Marketplace</span>
                            </div>
                        </div>
                        
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Connecting knowledge seekers with expert professionals worldwide. 
                            Get answers, share expertise, and build meaningful connections.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="w-4 h-4 text-blue-400" />
                                <a href="mailto:support@knowledge-marketplace.com" className="hover:text-white transition-colors">
                                    support@knowledge-marketplace.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhone className="w-4 h-4 text-blue-400" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="w-4 h-4 text-blue-400" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4 mt-8">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 bg-gray-800 rounded-lg ${social.color} transition-all duration-300 hover:bg-gray-700 hover:scale-110`}
                                    aria-label={`Follow us on ${social.icon.name}`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section, index) => (
                        <div key={index} className="lg:col-span-1">
                            <h3 className="text-white font-semibold text-lg mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-white transition-colors duration-300 block py-1"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <div className="border-t border-gray-800 mt-12 pt-12">
                    <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:mx-0">
                        <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
                        <p className="text-gray-400 mb-6">
                            Get the latest updates on new features, expert insights, and community highlights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-400">
                            <span>&copy; {currentYear} Knowledge Marketplace.</span>
                            <span>Made with</span>
                            <FaHeart className="w-4 h-4 text-red-500" />
                            <span>for the community.</span>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Terms
                            </Link>
                            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Cookies
                            </Link>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-400 text-sm">Status:</span>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 text-sm font-medium">All Systems Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;