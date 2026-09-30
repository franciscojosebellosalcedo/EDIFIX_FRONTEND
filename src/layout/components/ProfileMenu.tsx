interface ProfileMenuProps {
    onProfile: () => void;
    onLogout: () => void;
}

const ProfileMenu = ({
    onProfile,
    onLogout,
}: ProfileMenuProps) => {
    return (
        <div className="profile-menu">
            <div className="profile-menu-user">
                <div className="avatar">MC</div>

                <div>
                    <strong>María Castillo</strong>
                    <span>Administradora</span>
                </div>
            </div>

            <button onClick={onProfile}>
                <i className="bi bi-person" />
                Perfil
            </button>

            <button onClick={onLogout}>
                <i className="bi bi-box-arrow-right" />
                Cerrar sesión
            </button>
        </div>
    );
};

export default ProfileMenu;