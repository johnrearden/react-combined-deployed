import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Alert, Button } from "react-bootstrap";

const Mp3EditForm = () => {
    const { id } = useParams();
    const mp3File = useRef();

    const [mp3Data, setMp3Data] = useState({
        name: "",
        sound_file: "",
    });

    const { name, sound_file } = mp3Data;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/mp3s/${id}/`);
                const { name, sound_file } = data;
                setMp3Data({ name, sound_file });
            } catch (err) {
                console.log(err);
            }

            handleMount();
        }
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);

        if (mp3File?.current?.files[0]) {
            formData.append('sound_file', mp3File?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/mp3s/${id}/`, formData);
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    }

    const handleChange = (event) => {
        setMp3Data({
            ...mp3Data,
            [event.target.name]: event.target.value,
        });
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="text-center">
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={handleChange}
                            name="name"
                        />
                    </Form.Group>

                    {errors?.content?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group>
                        <Form.Label
                            htmlFor="mp3-upload"
                        >
                            Change your mp3 file
                        </Form.Label>
                        <Form.File
                            id="mp3-upload"
                            ref={mp3File}
                            accept="audio/*"
                            onChange={(e) => {
                                if (e.target.files.length) {
                                    console.log('file changed');
                                }
                            }}
                        />
                    </Form.Group>
                    


                    <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                        save
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Mp3EditForm;