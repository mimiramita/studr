import librosa
import torch
from transformers import (
    Wav2Vec2ForCTC,
    Wav2Vec2Tokenizer,
    T5Tokenizer,
    TFT5ForConditionalGeneration,
)
from pytube import YouTube
import os
from pydub import AudioSegment
import subprocess
from pydub.utils import make_chunks
import shutil
from transformers import pipeline


def speech_recognition(link):
    yt = YouTube(link)
    video = yt.streams.filter(only_audio=True).first()
    video.download(filename="audio.mp3")

    subprocess.call(["ffmpeg", "-i", "audio.mp3", "audio.wav"])

    myaudio = AudioSegment.from_file("audio.wav", "wav")
    chunk_length_ms = 15000
    chunks = make_chunks(myaudio, chunk_length_ms)

    if not os.path.exists("audio_files"):
        os.mkdir("audio_files")
    for i, chunk in enumerate(chunks):
        chunk_name = "audio{0}.wav".format(i)
        chunk.export(chunk_name, format="wav")
        shutil.move(chunk_name, "audio_files/" + chunk_name)

    transcript = ""
    for i in range(len(chunks)):
        audio, rate = librosa.load(f"audio_files/audio{i}.wav", sr=16000)

        tokenizer = Wav2Vec2Tokenizer.from_pretrained("facebook/wav2vec2-base-960h")
        model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

        input_values = tokenizer(audio, return_tensors="pt").input_values
        logits = model(input_values).logits
        prediction = torch.argmax(logits, dim=-1)
        transcription = tokenizer.batch_decode(prediction)[0]
        transcript += transcription.lower() + " "

    return add_punctuation(transcript)


def add_punctuation(text):
    punctuated_text = ""

    tokenizer = T5Tokenizer.from_pretrained("SJ-Ray/Re-Punctuate")
    model = TFT5ForConditionalGeneration.from_pretrained("SJ-Ray/Re-Punctuate")
    inputs = tokenizer.encode("punctuate: " + text, return_tensors="tf")
    result = model.generate(inputs, max_new_tokens=512)
    decoded_output = tokenizer.decode(result[0], skip_special_tokens=True)

    while decoded_output.find("...") != -1 or decoded_output.find(" - - ") != -1:
        stop_index = None
        if decoded_output.find("...") == -1:
            stop_index = decoded_output.find(" - - ")
        elif decoded_output.find(" - - ") == -1:
            stop_index = decoded_output.find("...")
        else:
            stop_index = min(decoded_output.find("..."), decoded_output.find(" - - "))
        # print(decoded_output)

        punctuated_text += decoded_output[0:stop_index+1] + " "
        previous_text = decoded_output[0:stop_index]
        # print("previous_text: " + previous_text)

        start_search_text = max(previous_text.rfind("."), previous_text.rfind(","), previous_text.rfind("?"))
        search_text = previous_text[start_search_text+2:].lower()
        # print("search_sentence: " + search_text)

        start_new_text = text.find(search_text) + len(search_text)
        new_text = text[start_new_text:]
        # print(new_text)

        inputs = tokenizer.encode("punctuate: " + new_text, return_tensors="tf")
        result = model.generate(inputs, max_new_tokens=512)
        decoded_output = tokenizer.decode(result[0], skip_special_tokens=True)

    punctuated_text += decoded_output
    return punctuated_text

# print(speech_recognition("https://www.youtube.com/watch?v=kOEDG3j1bjs"))
def answer_question(context, question):
    question_answerer = pipeline(task="question-answering", model="my_awesome_qa_model")
    return question_answerer(question=question, context=context)["answer"]