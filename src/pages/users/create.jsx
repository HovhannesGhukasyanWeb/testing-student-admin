import { useState } from "react";
import Button from "../../components/ui/button";
import { Plus } from "lucide-react";
import Modal from "../../components/ui/modal";
import Form from './form';

const Create = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Button className="mr-2 flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4" />
                <span>Add user</span>
            </Button>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} title="Create user">
                    <Form closeModal={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    )
}

export default Create;