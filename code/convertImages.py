import os
import numpy as np
from img2vec import Img2Vec


def process_images(input_dir, output_dir, model_name="vgg19", weights="DEFAULT"):
    """
    Process images in the input directory and save vectors in the output directory.

    Parameters:
    -----------
    input_dir : str
        Path to the directory containing images and subdirectories.
    output_dir : str
        Path to the directory where vectors will be stored.
    model_name : str
        Model architecture to use for embedding images.
    weights : str
        Pretrained weights to use in the model.
    """
    # Initialize the Img2Vec class
    img2vec = Img2Vec(model_name=model_name, weights=weights)

    # Walk through the input directory
    for root, _, files in os.walk(input_dir):
        for file in files:
            # Check if the file is an image
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
                image_path = os.path.join(root, file)
                relative_path = os.path.relpath(root, input_dir)
                vector_subfolder = os.path.join(output_dir, relative_path)

                # Create the corresponding subfolder in the output directory
                os.makedirs(vector_subfolder, exist_ok=True)

                # Path to save the vector
                vector_path = os.path.join(vector_subfolder, f"{os.path.splitext(file)[0]}.npy")

                try:
                    # Embed the image and get the vector
                    vector = img2vec.embed_image(image_path).cpu().detach().numpy().squeeze()

                    # Save the vector as a .npy file
                    np.save(vector_path, vector)
                    print(f"Vector saved at: {vector_path}")
                except Exception as e:
                    print(f"Error processing {image_path}: {e}")


if __name__ == "__main__":
    input_directory = "data/"  # Directory containing images
    output_directory = "vectors/"  # Directory to save the vectors
    process_images(input_directory, output_directory)