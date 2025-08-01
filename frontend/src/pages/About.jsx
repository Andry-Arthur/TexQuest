import React, { useRef, useState } from 'react'
import { easeOut, motion } from 'framer-motion'
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Email, Instagram } from '@mui/icons-material';
import { Link, Element } from 'react-scroll';
function About() {
    // Autofill background fix for all browsers
    // This style will be injected into the page
    // It targets autofilled inputs and forces background to white
    const autofillStyle = `
      input:-webkit-autofill,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        box-shadow: 0 0 0px 1000px #fff inset !important;
        background-color: #fff !important;
        -webkit-text-fill-color: #000 !important;
        color: #000 !important;
      }
      input:-internal-autofill-selected {
        background-color: #fff !important;
        color: #000 !important;
      }`;


    // Team members data
    const teamMembers = [
        {
            name: "Andry Rakotonjanabelo",
            bio: ""
        },
        {
            name: "Abiral Shrestha",
            bio: ""
        }
    ]
    // FAQ state management
    const [openFAQ, setOpenFAQ] = useState(null)

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index)
    }

    // FAQ data
    const faqData = [
        {
            question: "What is TexQuest?",
            answer:
                "TexQuest is a competitive platform designed to challenge participants on their LaTeX and problem-posing skills. It's built for math and programming enthusiasts who want to test their abilities in creating and formatting mathematical content using LaTeX.",
        },
        {
            question: "How does the competition work?",
            answer:
                "Participants submit custom questions using LaTeX formatting. These submissions are then evaluated using AI-powered grading systems that assess both the technical accuracy of the LaTeX code and the quality of the mathematical content.",
        },
        {
            question: "What skills do I need to participate?",
            answer:
                "You should have basic knowledge of LaTeX syntax, mathematical notation, and problem-solving skills. While advanced LaTeX knowledge is helpful, we welcome participants of all skill levels who are eager to learn and improve.",
        },
        {
            question: "How is the grading done?",
            answer:
                "Our AI-powered grading system evaluates submissions based on LaTeX syntax accuracy, mathematical correctness, problem clarity, and overall presentation. The system provides instant feedback to help participants learn and improve.",
        },
        {
            question: "How can I participate in TexQuest?",
            answer:
                "Keep an eye on our announcements through our social media channels and email updates. Registration details and competition dates will be posted well in advance of each event.",
        },
    ]

    // Ref for contact us button to scroll down to contact form 
    const contactRef = useRef();
    // Image data array
    const eventImages = [
        {
            id: 1,
            url: "/images/pic1.JPEG",
            alt: "TexQuest Programming Contest 2024",
        },
        {
            id: 2,
            url: "/images/pic2.JPEG",
            alt: "After competition, participants enjoying food",
        },
        {
            id: 3,
            url: "/images/pic3.JPEG",
            alt: "LaTeX Tutorial Session",
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&w=400&dpr=2",
            alt: "Team Collaboration Event",
        },
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&w=400&dpr=2",
            alt: "Awards Ceremony",
            title: "Awards Ceremony"
        },
        {
            id: 6,
            url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&w=400&dpr=2",
            alt: "Coding Competition Finals",
            title: "Competition Finals"
        }
    ];

    // Form for contact us
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    function onSubmit(data) {
        console.log(data)
    }

    // For sending email
    const form = useRef();

    const sendEmail = (data) => {
        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                {
                    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                }
            )
            .then(
                () => {
                    console.log('SUCCESS!');
                    alert('Message sent successfully!');
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    alert('Failed to send message. Please try again.');
                },
            );
    };
    // Floating particles effect - independent positions
    const particleStyles = [...Array(10)].map((_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    }))


    return (
        <>
            <style>{autofillStyle}</style>
            <div className='min-h-screen py-12 px-4 flex flex-col items-center relative overflow-hidden bg-gray-900 text-white'>

                {/* Integral symbol */}
                <motion.div
                    className="absolute text-7xl font-bold text-cyan-400 drop-shadow-lg"
                    style={{
                        top: "8%",
                        left: "12%",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.7,
                        y: [0, -30, 0],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                    }}
                >
                    ∫
                </motion.div>

                {/* Pi symbol */}
                <motion.div
                    className="absolute text-5xl font-semibold text-emerald-400 drop-shadow-lg"
                    style={{
                        top: "15%",
                        right: "18%",
                    }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                        opacity: 0.6,
                        x: 0,
                        y: [0, -20, 0],
                        rotate: [0, -180, 0],
                        scale: [1, 0.9, 1.1, 1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                >
                    π
                </motion.div>

                {/* Sigma symbol */}
                <motion.div
                    className="absolute text-6xl font-bold text-amber-400 drop-shadow-lg"
                    style={{
                        top: "35%",
                        left: "8%",
                    }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{
                        opacity: 0.7,
                        y: [0, -25, 0],
                        rotate: [0, 90, 0],
                        scale: [1, 1.3, 0.9, 1]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    Σ
                </motion.div>

                {/* Partial derivative */}
                <motion.div
                    className="absolute text-4xl font-medium text-rose-400 drop-shadow-lg"
                    style={{
                        top: "55%",
                        right: "10%",
                    }}
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{
                        opacity: 0.6,
                        y: [0, -35, 0],
                        rotate: [0, 720, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1.5
                    }}
                >
                    ∂/∂x
                </motion.div>

                {/* Square root */}
                <motion.div
                    className="absolute text-5xl font-semibold text-violet-400 drop-shadow-lg"
                    style={{
                        top: "65%",
                        left: "25%",
                    }}
                    initial={{ opacity: 0, rotate: 180 }}
                    animate={{
                        opacity: 0.7,
                        y: [0, -15, 0],
                        rotate: [0, -360, 0],
                        scale: [1, 0.8, 1.2, 1]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2
                    }}
                >
                    √
                </motion.div>

                {/* Infinity symbol */}
                <motion.div
                    className="absolute text-6xl font-bold text-teal-400 drop-shadow-lg"
                    style={{
                        top: "25%",
                        right: "28%",
                    }}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{
                        opacity: 0.6,
                        x: 0,
                        y: [0, -40, 0],
                        rotate: [0, 180, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{
                        duration: 8.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2.5
                    }}
                >
                    ∞
                </motion.div>

                {/* Function notation */}
                <motion.div
                    className="absolute text-4xl font-medium text-orange-400 drop-shadow-lg"
                    style={{
                        top: "75%",
                        right: "35%",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: 0.7,
                        y: [0, -20, 0],
                        rotate: [0, 360, 0]
                    }}
                    transition={{
                        duration: 6.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 3
                    }}
                >
                    f(x)
                </motion.div>

                {/* Additional mathematical symbols */}
                <motion.div
                    className="absolute text-5xl font-semibold text-indigo-400 drop-shadow-lg"
                    style={{
                        top: "45%",
                        right: "5%",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: 0.6,
                        y: [0, -30, 0],
                        rotate: [0, -180, 0],
                        scale: [1, 1.4, 0.8, 1]
                    }}
                    transition={{
                        duration: 7.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 3.5
                    }}
                >
                    Δ
                </motion.div>

                {/* Main Content */}
                <div className='relative z-10'>
                    <h6 className='text-4xl font-bold text-center mb-4'>Our Story</h6>
                    <h1 className='mb-4 text-center'>Got LaTeX skills? Time to prove it.</h1>
                    <div className='text-center max-w-3xl mb-6 mx-auto'>TexQuest is a competitive platform built to challenge participants on their LaTeX and problem-posing skills. Designed for math and programming enthusiasts, it lets users submit custom questions using LaTeX, which are then graded using AI.</div>
                    <div className='flex justify-center mb-6'>
                        <button className="bg-blue-600 hover:bg-blue-400 border-2 border-blue-600 hover:border-blue-300 text-white font-medium py-2 px-4 rounded-md transition-all" onClick={() => {
                            contactRef.current?.scrollIntoView({
                                behavior: "smooth"
                            })
                        }} >
                            Contact Us
                        </button>
                    </div>
                    <motion.div
                        className="text-8xl font-black mt-12 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent opacity-80 text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: 0.8,
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut"
                        }}
                        viewport={{ once: true }}
                    >
                        LATEX
                    </motion.div>
                </div>

                {/* Floating particles effect */}
                {particleStyles.map((style, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                        style={style}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 20, -10, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.2, 0.8, 1]
                        }}
                        transition={{
                            duration: 5 + i * 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.8,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Mission Section */}
            <div className='min-h-screen py-12 px-4 flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden'>

                {/* Floating particles effect for Mission */}
                {particleStyles.map((style, i) => (
                    <motion.div
                        key={`mission-${i}`}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                        style={style}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 20, -10, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.2, 0.8, 1]
                        }}
                        transition={{
                            duration: 5 + i * 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.8,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2
                        className='text-5xl font-bold mb-8'
                        style={{ color: '#ffffff' }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        Our Mission
                    </motion.h2>
                    <motion.p
                        className='text-xl leading-relaxed max-w-3xl mx-auto'
                        style={{ color: '#ffffff' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: false }}
                    >
                        We believe in empowering students through accessible, engaging, and intelligent
                        education technology. TexQuest exists to democratize competitive programming
                        and provide instant, accurate feedback that helps learners grow faster and
                        more effectively than ever before.
                    </motion.p>
                </motion.div>
            </div>
            <div className='min-h-screen py-12 px-4 flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden'>

                {/* Floating particles effect for Past Events */}
                {particleStyles.map((style, i) => (
                    <motion.div
                        key={`events-${i}`}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                        style={style}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 20, -10, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.2, 0.8, 1]
                        }}
                        transition={{
                            duration: 5 + i * 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.8,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                <motion.h2
                    className='text-5xl font-bold mb-12'
                    style={{ color: '#ffffff' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: false }}
                >
                    Past Events
                </motion.h2>

                {/* Team Members Section */}

                
                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {eventImages.map((image, index) => (
                        <motion.img
                            key={image.id}
                            className="rounded-lg shadow-lg w-full h-64 object-cover"
                            alt={image.alt}
                            src={image.url}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                            viewport={{ once: false }}
                        />
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
                {/* Floating particles effect for FAQ */}
                {particleStyles.map((style, i) => (
                    <motion.div
                        key={`faq-${i}`}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                        style={style}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 20, -10, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.2, 0.8, 1],
                        }}
                        transition={{
                            duration: 5 + i * 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.8,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                <motion.div
                    className="relative z-10 max-w-4xl mx-auto w-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-5xl font-bold mb-28 pb-2 text-center"
                        style={{ color: "#ffffff" }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <div className="space-y-4 ">
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800 bg-opacity-80 rounded-lg border border-gray-600 overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: false }}
                            >
                                <button
                                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                                    <motion.div
                                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="flex-shrink-0"
                                    >
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openFAQ === index ? "auto" : 0,
                                        opacity: openFAQ === index ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4 text-gray-300 leading-relaxed">{faq.answer}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Contact US section */}
            <div className='min-h-screen py-12 px-4 flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden'>
                {/* Floating particles effect for Contact Us */}
                {particleStyles.map((style, i) => (
                    <motion.div
                        key={`contact-${i}`}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                        style={style}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 20, -10, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.2, 0.8, 1]
                        }}
                        transition={{
                            duration: 5 + i * 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.8,
                            ease: "easeInOut"
                        }}
                    />
                ))}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: false }}
                >
                    <h2 className="text-6xl font-bold mb-4 text-white" style={{ color: '#fff' }}>
                        Get In Touch
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have questions about TexQuest? We'd love to hear from you. Send us a message and we'll respond as soon as
                        possible.
                    </p>
                </motion.div>

                {/* Contact */}
                <div className='flex flex-col md:flex-row justify-center gap-8 w-full max-w-4xl mx-auto min-w-0' ref={contactRef}>
                    {/* Contact Cards Section */}
                    <div className="flex-1 max-w-md">
                        {/* Email Contact Card */}
                        <a href="mailto:shreab01@gettysburg.edu" style={{ textDecoration: 'none', display: 'block' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -90 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                // whileHover={{ 
                                //     scale: 1.02,
                                //     y: -5,
                                //     transition: { duration: 0.3, ease: "easeOut" }
                                // }}
                                transition={{
                                    duration: 1.2,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: false }}
                                className="flex items-center gap-4 p-4 mb-4 bg-gray-700 bg-opacity-80 rounded-lg border border-gray-600 hover:bg-gray-600 hover:bg-opacity-90 hover:border-gray-500 transition-all duration-500 ease-out cursor-pointer"
                            >
                                <motion.div
                                    className="w-15 h-15 bg-gray-600 bg-opacity-80 rounded-lg border border-gray-500 flex items-center justify-center transition-all duration-500 ease-out"
                                    whileHover={{
                                        backgroundColor: "rgba(55, 65, 81, 1)",
                                        scale: 1.1,
                                        rotate: 5,
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                >
                                    <Email className="text-white text-3xl transition-colors duration-500 ease-out" />
                                </motion.div>
                                <div>
                                    <p className="text-white text-sm mb-1 transition-colors duration-500 ease-out">Email us at</p>
                                    <span className="text-white text-xl font-bold transition-colors duration-500 ease-out" style={{ color: '#fff', fontWeight: 'bold' }}>shreab01@gettysburg.edu</span>
                                </div>
                            </motion.div>
                        </a>

                        {/* Instagram Contact Card */}
                        <a href="https://www.instagram.com/gburg_acm/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -90 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: false }}
                                className="flex items-center gap-4 p-4 mb-6 bg-gray-700 bg-opacity-80 rounded-lg border border-gray-600 hover:bg-gray-600 hover:bg-opacity-90 hover:border-gray-500 transition-all duration-500 ease-out cursor-pointer"
                            >
                                <motion.div
                                    className="w-15 h-15 bg-opacity-80 rounded-lg border border-gray-500 flex items-center justify-center transition-all duration-500 ease-out"
                                    whileHover={{
                                        backgroundColor: "rgba(55, 65, 81, 1)",
                                        scale: 1.1,
                                        rotate: -5,
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                >
                                    <Instagram className="text-white text-3xl transition-colors duration-500 ease-out" />
                                </motion.div>
                                <div>
                                    <p className="text-white text-sm mb-1 transition-colors duration-500 ease-out">Follow us on</p>
                                    <span className="text-white text-xl font-bold transition-colors duration-500 ease-out" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>@gburg_acm</span>
                                </div>
                            </motion.div>
                        </a>
                    </div>

                    {/* Contact Form Section */}
                    <div className="flex-1 max-w-md min-w-0 flex-shrink" name="contactForm">
                        <motion.div
                            initial={{ opacity: 0, x: 90 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            // whileHover={{
                            //     scale: 1.02,
                            //     y: -5,
                            //     backgroundColor: "rgba(31, 41, 55, 0.95)",
                            //     borderColor: "#64748b",
                            //     boxShadow: "0 8px 32px 0 rgba(31, 41, 55, 0.25)",
                            //     transition: { duration: 0.3, ease: "easeOut" }
                            // }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className="w-full cursor-pointer"
                        >
                            <form ref={form} onSubmit={handleSubmit(sendEmail)} className="space-y-4 bg-gray-800 p-6 rounded-lg border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-blue-500">
                                <div>
                                    <label htmlFor="name" className="block text-white mb-2">Name</label>
                                    <input type="text" name="name" {...register('name', { required: true, minLength: 3 })} className="w-full p-2 rounded text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 autofill:bg-black autofill:text-black" />
                                    {errors.name && <p className="text-red-400 text-sm mt-1">Name is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                                    <input type="email" name="email" {...register('email', { required: true })} className="w-full p-2 rounded text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 autofill:bg-black" />
                                    {errors.email && <p className="text-red-400 text-sm mt-1">Email is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-white mb-2">Message</label>
                                    <textarea name="message" {...register('message', { required: true, maxLength: 500 })} rows="4" className="w-full p-2 rounded bg-white text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                    {errors.message && <p className="text-red-400 text-sm mt-1">Message is required</p>}
                                </div>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full">
                                    Send Message
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About