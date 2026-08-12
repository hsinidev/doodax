import React, { useState } from 'react';

const DNSLookupToolArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-600 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-52 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-amber-400">
                    <h2>The Difference Between A, CNAME, and MX Records and How DNS Propagation Works</h2>
                    <p>
                        The Domain Name System (DNS) is often called the "phonebook of the internet," but its role is far more complex than that simple analogy suggests. It's a hierarchical and decentralized naming system that translates human-readable domain names (like <code>example.com</code>) into the machine-readable IP addresses (like <code>192.0.2.1</code>) needed for devices to locate each other. This translation process is handled by various types of DNS records, each serving a unique purpose. Understanding the most common record types—A, CNAME, and MX—is fundamental for anyone managing a website, setting up email, or diagnosing network issues. Furthermore, understanding DNS propagation and the concept of TTL is key to managing changes and minimizing downtime.
                    </p>

                    <h3>A Records: The Foundation of Connectivity</h3>
                    <p>
                        The 'A' record, which stands for "Address," is the most basic and essential type of DNS record. Its function is straightforward: it maps a domain or subdomain directly to an IPv4 address. When you type a domain name into your browser, your computer's first step is to perform a DNS lookup to find the A record associated with that name. Once it has the IP address, your browser can establish a connection with the web server hosting the site. A single domain can have multiple A records, a technique often used for load balancing, where traffic is distributed across several servers to improve reliability and performance.
                    </p>

                    <h3>CNAME Records: The Alias of the Internet</h3>
                    <p>
                        A CNAME (Canonical Name) record is used to map a domain or subdomain to another domain name, rather than an IP address. Think of it as creating an alias. For instance, you might have <code>www.example.com</code> as a CNAME record that points to <code>example.com</code>. This is incredibly useful for managing multiple services under one domain. If the IP address of <code>example.com</code> changes, you only need to update its A record; the <code>www</code> alias will automatically point to the new location without needing a separate update. However, CNAME records have a key limitation: if a subdomain has a CNAME record, it cannot have any other DNS records (like MX or TXT). This is why the root domain (e.g., <code>example.com</code>) itself is typically not a CNAME.
                    </p>
                    
                    <h3>MX Records: Directing the Mail</h3>
                    <p>
                        MX (Mail Exchanger) records are responsible for directing email to the correct mail servers. When someone sends an email to <code>user@example.com</code>, the sending mail server performs a DNS lookup to find the MX records for <code>example.com</code>. These records specify the hostnames of the mail servers responsible for accepting mail for that domain, along with a priority number. The mail is sent to the server with the lowest priority number first. If that server is unavailable, the sender will try the server with the next lowest priority, providing a built-in redundancy for email delivery. Without correctly configured MX records, a domain cannot receive email.
                    </p>

                    <h3>Understanding DNS Propagation and TTL</h3>
                    <p>
                        When you create or update a DNS record, the change is not instantaneous across the entire internet. This delay is known as DNS propagation. The process involves recursive DNS servers around the world updating their cached information. The speed of this propagation is controlled by a value called the Time to Live (TTL), which is set for each DNS record.
                    </p>
                    <p>
                        The TTL, measured in seconds, tells DNS resolvers how long they should cache a particular DNS record before they need to query the authoritative DNS server again for a fresh copy. A common TTL might be 3600 seconds (1 hour). A shorter TTL means changes will propagate faster, but it also increases the load on the authoritative DNS server because resolvers will check for updates more frequently. Conversely, a longer TTL reduces server load but means changes will take longer to take effect globally. When planning a significant change, such as migrating a website to a new server, administrators often lower the TTL in advance to ensure the transition is as seamless as possible.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-amber-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default DNSLookupToolArticle;