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
    const audioPlayerRef = useRef();

    const [mp3Data, setMp3Data] = useState({
        name: "",
        sound_file: "",
    });

    const [audioPlayerSource, setAudioPlayerSource] = useState(null);

    const [fileName, setFilename] = useState("");

    const { name, sound_file } = mp3Data;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/mp3s/${id}/`);
                console.log(data);
                const { name, sound_file } = data;
                setMp3Data({ name, sound_file });
                setAudioPlayerSource(sound_file);
                console.log(sound_file.split('/'))
                setFilename(sound_file.split('/').pop());
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
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

    const handleSoundFileChange = () => {
        if (mp3File?.current?.files[0]) {
            const file = mp3File?.current?.files[0];
            setAudioPlayerSource(URL.createObjectURL(file));
            setFilename(file.name);
        }
    }

    console.log(errors);

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="d-flex justify-content-center mt-5">
                <Col md={8} lg={6} className="text-center">
                    <h1>Favourite Tune</h1>
                    <Form.Group className="border p-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={handleChange}
                            name="name"
                        />
                    </Form.Group>

                    <div className="border p-3">
                        <h5>Current mp3 : </h5>
                        <em>{fileName}</em>
                        <div>
                            <audio 
                                controls
                                src={audioPlayerSource}
                                ref={audioPlayerRef}
                            />
                        </div>
                        

                        {errors?.content?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                        <Form.Label
                            className={`${btnStyles.Button} ${btnStyles.Blue} mt-3 btn`}
                            htmlFor="mp3-upload"
                        >
                            Change the sound file
                        </Form.Label>
                            <Form.File
                                id="mp3-upload"
                                ref={mp3File}
                                accept="audio/*"
                                onChange={handleSoundFileChange}
                            />
                        </Form.Group>
                    </div>


                    <Button className={`${btnStyles.Button} ${btnStyles.Blue} mt-3 w-50`} type="submit">
                        Save Favourite Tune
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Mp3EditForm;