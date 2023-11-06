import './modals.css';
import { useState, useCallback } from 'react';
import { FaFilm, FaUser, FaTags } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { CreateMovie, InfoGenres, UserInfo } from '../menu';


interface ModalsProps {
    userData: UserData | null;
    onActionSuccess: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ userData, onActionSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState<string | null>(null);

    const openModal = (form: string) => {
        setSelectedForm(form);
        setIsModalOpen(true);
    };

    const closeModal = useCallback(() => {
        setSelectedForm(null);
        setIsModalOpen(false);
        if (selectedForm) {
            onActionSuccess();
        }
    }, [selectedForm, onActionSuccess]);

    return (
        <>
            <div>
                <ul className="modal-list">
                    <li onClick={() => openModal('user')}><FaUser /></li>
                    <li onClick={() => openModal('movie')}><FaFilm /></li>
                    <li onClick={() => openModal('genre')}><FaTags /></li>
                </ul>
            </div>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Home Modal"
                appElement={document.getElementById('root')!}
            >
                <button onClick={closeModal}>X</button>

                {selectedForm === 'user' && <UserInfo userData={userData} />}

                {selectedForm === 'movie' && userData?.id && (
                    <CreateMovie userId={userData.id} onCreateSuccess={closeModal} />
                )}
                {selectedForm === 'genre' && <InfoGenres onActionSuccess={onActionSuccess} />

                }
            </ReactModal>
        </>
    );
};
