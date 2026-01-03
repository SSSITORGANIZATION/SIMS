import React, { useState, useEffect, useRef } from "react";
import "./TeamCredits.css";
import "./TeamCreditsStyles.css";

// Import team images
import sudarsanImage from "../assets/team/sudarsan.jpg";
import swathiImage from "../assets/team/swathi.png";
import durgaImage from "../assets/team/durga.png";
import santhoshiImage from "../assets/team/santhoshi.jpeg";

const TeamCredits = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('3d-theme'); // Default theme
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [teamMembers, setTeamMembers] = useState([
        {
            id: 1,
            name: "Bandapalli Sudarsan Babu (Team Lead)",
            role: "Full Stack Developer",
            description: "backend development,frontend development",
            image: sudarsanImage,
            backgroundImage: "linear-gradient(135deg, rgba(48, 42, 220, 0.1), rgba(62, 46, 201, 0.05))",
            skills: ["Python", "Django Rest Api", "React js", "HTML", "CSS", "Bootstrap"]
        },
        {
            id: 2,
            name: "Jonnalagadda Lakshmi Swathi",
            role: "Full Stack Developer",
            description: "backend development,frontend development",
            image: swathiImage,
            backgroundImage: "linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(48, 42, 220, 0.05))",
            skills: ["Python", "Django Rest Api", "React js", "HTML", "CSS", "Bootstrap"]
        },
        {
            id: 3,
            name: "Vasamsetty Durga Prasad",
            role: "Full Stack Developer",
            description: "backend development,frontend development",
            image: durgaImage,
            backgroundImage: "linear-gradient(135deg, rgba(255, 68, 68, 0.1), rgba(48, 42, 220, 0.05))",
            skills: ["Python", "Django Rest Api", "React js", "HTML", "CSS", "Bootstrap"]
        },
        {
            id: 4,
            name: "Palli Santhoshi",
            role: "Full Stack Developer",
            description: "frontend development",
            image: santhoshiImage,
            backgroundImage: "linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(48, 42, 220, 0.05))",
            skills: ["java", "React js", "HTML", "CSS", "Bootstrap"]
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        description: '',
        skills: '',
        image: null
    });

    const keySequence = useRef([]);

    // Available themes
    const themes = [
        { id: '3d-theme', name: '3D Theme', icon: '🎭' },
        { id: 'neon-theme', name: 'Neon Cyberpunk', icon: '🌃' },
        { id: 'glass-theme', name: 'Glass Morphism', icon: '🔮' },
        { id: 'minimal-theme', name: 'Minimalist', icon: '⚪' },
        { id: 'wave-theme', name: 'Gradient Wave', icon: '🌊' },
        { id: 'dark-pro-theme', name: 'Dark Pro', icon: '⚫' }
    ];

    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    useEffect(() => {
        const handleKeyPress = (event) => {
            // Handle CapsLock issue - convert to lowercase for letters
            let key = event.key;
            if (key.length === 1 && key >= 'A' && key <= 'Z') {
                key = key.toLowerCase();
            }

            // Add current key to sequence
            keySequence.current.push(key);

            // Keep only last 10 keys
            if (keySequence.current.length > 10) {
                keySequence.current = keySequence.current.slice(-10);
            }

            // Check if sequence matches
            const currentSequence = keySequence.current.join(',');
            const targetSequence = secretCode.join(',');

            if (currentSequence === targetSequence) {
                console.log('Team credits activated!');
                setIsVisible(true);
                keySequence.current = []; // Reset sequence
            }

            // Debug: log current sequence
            console.log('Current sequence:', keySequence.current);
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    // Dynamic form handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMember = {
            id: editingMember ? editingMember.id : Date.now(),
            name: formData.name,
            role: formData.role,
            description: formData.description,
            skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
            image: formData.image || `https://picsum.photos/seed/${formData.name}/200/200.jpg`,
            backgroundImage: `linear-gradient(135deg, rgba(${Math.random() * 255 | 0}, ${Math.random() * 255 | 0}, ${Math.random() * 255 | 0}, 0.1), rgba(48, 42, 220, 0.05))`
        };

        if (editingMember) {
            setTeamMembers(prev => prev.map(member =>
                member.id === editingMember.id ? newMember : member
            ));
        } else {
            setTeamMembers(prev => [...prev, newMember]);
        }

        resetForm();
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            description: member.description,
            skills: member.skills.join(', '),
            image: member.image
        });
        setShowAddForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            setTeamMembers(prev => prev.filter(member => member.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            description: '',
            skills: '',
            image: null
        });
        setEditingMember(null);
        setShowAddForm(false);
    };

    if (!isVisible) return null;

    return (
        <div className={`team-credits-overlay ${currentTheme}`} onClick={() => setIsVisible(false)}>
            {/* Style Switcher */}
            <div className="style-switcher" onClick={(e) => e.stopPropagation()}>
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        className={`style-btn ${currentTheme === theme.id ? 'active' : ''}`}
                        onClick={() => setCurrentTheme(theme.id)}
                        title={theme.name}
                    >
                        {theme.icon} {theme.name}
                    </button>
                ))}
            </div>

            <div className="team-credits-modal" onClick={(e) => e.stopPropagation()}>
                <div className="team-credits-header">
                    <h2>Development Team</h2>
                    <p>SSSIT Computer Education Management System</p>
                    <div className="header-actions">
                        <button
                            className="add-member-btn"
                            onClick={() => setShowAddForm(true)}
                            title="Add new team member"
                        >
                            + Add Member
                        </button>
                        <button
                            className="close-btn"
                            onClick={() => setIsVisible(false)}
                            aria-label="Close team credits"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member-card" style={{ '--card-index': index, 'background-image': member.backgroundImage }}>
                            <div className="member-image">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    onError={(e) => {
                                        // Fallback to colored initial
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                {/* Fallback colored initial */}
                                <div
                                    className="member-initial"
                                    style={{
                                        display: 'none',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #302adc, #3e2ec9)',
                                        color: 'white',
                                        fontSize: '48px',
                                        fontWeight: 'bold',
                                        margin: '0 auto',
                                        border: '4px solid #302adc',
                                        boxShadow: '0 8px 20px rgba(48, 42, 220, 0.2)'
                                    }}
                                >
                                    {member.name.charAt(0)}
                                </div>
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                                <p className="member-description">{member.description}</p>
                                <div className="member-skills">
                                    {member.skills.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                                <div className="member-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(member)}
                                        title="Edit member"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(member.id)}
                                        title="Delete member"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="team-credits-footer">
                    <p>© 2025 SSSIT Computer Education</p>
                    <p>Built with passion for education technology</p>
                    <small>Press ESC or click outside to close</small>
                </div>
            </div>

            {/* Add/Edit Team Member Form Modal */}
            {showAddForm && (
                <div className="team-form-overlay" onClick={(e) => e.stopPropagation()}>
                    <div className="team-form-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="form-header">
                            <h3>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</h3>
                            <button className="close-btn" onClick={resetForm}>×</button>
                        </div>

                        <form onSubmit={handleSubmit} className="team-form">
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter team member name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">Role *</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., Full Stack Developer, UI Designer"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Brief description of responsibilities"
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="skills">Skills *</label>
                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., React, Python, CSS (comma-separated)"
                                />
                                <small>Separate skills with commas</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Profile Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                {formData.image && (
                                    <div className="image-preview">
                                        <img src={formData.image} alt="Preview" />
                                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: null }))}>
                                            Remove Image
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    {editingMember ? 'Update Member' : 'Add Member'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamCredits;
