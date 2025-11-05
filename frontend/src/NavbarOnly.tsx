import React from 'react';

// --- TYPE DEFINITIONS ---

// Type for the SVG icon props
interface IconProps {
    path: string;
    size?: number;
    color?: string;
    style?: React.CSSProperties;
}

// Type for the Navbar links
interface NavLink {
    name: string;
    href: string;
    // Icon should be a function component that accepts standard SVG/React props
    Icon: React.FC<React.SVGProps<SVGSVGElement>>; 
}


// --- ICON COMPONENTS ---

// Generic Icon utility component
const Icon: React.FC<IconProps> = ({ path, size = 20, color = 'white', style = {} }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ marginRight: 6, ...style }}
    >
        <path d={path} />
    </svg>
);

// Specific Icon wrappers (using React.FC<React.SVGProps<SVGSVGElement>> for easy integration)
const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" {...props} />
);
const YoutubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon path="M2.5 17.5c0-.8.7-1.5 1.5-1.5h16c.8 0 1.5.7 1.5 1.5v-11c0-.8-.7-1.5-1.5-1.5h-16c-.8 0-1.5.7-1.5 1.5v11zM10 8l6 4-6 4z" {...props} />
);
const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon path="M18 2h-12a5 5 0 0 0-5 5v12a5 5 0 0 0 5 5h12a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM18.5 7.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z" {...props} />
);
const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 6.91 14.14 2 9.27l6.91-1.01L12 2z" {...props} />
);
const ShoppingBagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon path="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" {...props} />
);


// --- LINK DATA ---

const navLinks: NavLink[] = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/groups/Jawsmovie",
        Icon: FacebookIcon
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/@thesharkisstillworking9334/videos",
        Icon: YoutubeIcon
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/jawsmovie75",
        Icon: InstagramIcon
    },
    {
        name: "The Shark is Still Working",
        href: "http://facebook.com/profile.php?id=100063606841043",
        Icon: StarIcon
    },
    {
        name: "eBay Storefront",
        href: "https://www.ebay.com/inf/jawsmovie-1975/collections/57258868747?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5339130190&toolid=80010&mkevt=1",
        Icon: ShoppingBagIcon
    }
];

// --- MAIN COMPONENT ---

export const NavbarOnly: React.FC = () => {

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.backgroundColor = '#14355a';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.backgroundColor = 'transparent';
    };

    return (
        <nav style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px", 
            backgroundColor: "#1f487e", /* Darker blue inspired by Jaws */
            padding: "12px",
            borderRadius: "6px",
            marginTop: "16px",
            marginBottom: "32px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            border: "1px solid #14355a",
            flexWrap: 'wrap', // Responsive wrapping
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}>
            {navLinks.map(link => (
                <a 
                    key={link.name}
                    href={link.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                        color: "#fff", 
                        textDecoration: "none", 
                        fontWeight: "bold", 
                        fontSize: "0.9rem", 
                        padding: "8px 12px",
                        borderRadius: "4px",
                        transition: 'background-color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        margin: '4px 0', 
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <link.Icon style={{ marginRight: 8 }} width={18} height={18} />
                    {link.name}
                </a>
            ))}
        </nav>
    );
};

export default NavbarOnly;
