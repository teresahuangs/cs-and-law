import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset, Subset
import numpy as np
from sklearn.model_selection import train_test_split


class VectorsDataset(Dataset):
    def __init__(self, root_dir, target_folders, other_folders):
        self.data = []
        self.labels = []

        # Load vectors from target folders (VincentVanGogh = 1)
        for folder in target_folders:
            folder_path = os.path.join(root_dir, folder)
            self.load_vectors(folder_path, label=1)

        # Load vectors from other folders (Other = 0)
        for folder in other_folders:
            folder_path = os.path.join(root_dir, folder)
            self.load_vectors(folder_path, label=0)

    def load_vectors(self, folder, label):
        for root, _, files in os.walk(folder):
            for file in files:
                if file.endswith(".npy"):
                    vector_path = os.path.join(root, file)
                    vector = np.load(vector_path)
                    self.data.append(vector)
                    self.labels.append(label)

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        vector = torch.tensor(self.data[idx], dtype=torch.float32)
        label = torch.tensor(self.labels[idx], dtype=torch.long)
        return vector, label


# Neural network classifier
class SimpleNN(nn.Module):
    def __init__(self, input_size):
        super(SimpleNN, self).__init__()
        self.fc = nn.Sequential(
            nn.Linear(input_size, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 2),
        )

    def forward(self, x):
        return self.fc(x)


def count_classes(dataset, indices):
    """
    Count the number of samples for each class in a dataset subset.
    """
    labels = [dataset.labels[i] for i in indices]
    class_counts = {0: labels.count(0), 1: labels.count(1)}
    return class_counts


def train_classifier(root_dir):
    # Define subfolders
    target_folders = ["VVG", "RedBubbleVVG"]
    other_folders = ["Andy_Warhol", "Monet", "RedBubbleNotVVG"]

    # Create dataset
    dataset = VectorsDataset(root_dir, target_folders, other_folders)
    print("Total Dataset size: ", len(dataset))

    # Create stratified train, validation, and test splits
    labels = dataset.labels
    train_indices, temp_indices = train_test_split(
        range(len(labels)), test_size=0.4, stratify=labels, random_state=42
    )
    val_indices, test_indices = train_test_split(
        temp_indices, test_size=0.75, stratify=[labels[i] for i in temp_indices], random_state=42
    )

    # Count and print class distribution
    train_counts = count_classes(dataset, train_indices)
    val_counts = count_classes(dataset, val_indices)
    test_counts = count_classes(dataset, test_indices)

    print(f"Training set: {train_counts} (VincentVanGogh = {train_counts[1]}, Other = {train_counts[0]})")
    print(f"Validation set: {val_counts} (VincentVanGogh = {val_counts[1]}, Other = {val_counts[0]})")
    print(f"Test set: {test_counts} (VincentVanGogh = {test_counts[1]}, Other = {test_counts[0]})")

    # Subset datasets for train, validation, and test
    train_dataset = Subset(dataset, train_indices)
    val_dataset = Subset(dataset, val_indices)
    test_dataset = Subset(dataset, test_indices)

    # Create data loaders
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
    test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

    # Model, loss, and optimizer
    input_size = dataset[0][0].shape[0]
    model = SimpleNN(input_size)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # Training loop with validation
    best_val_loss = float('inf')
    best_model_state = None
    epochs = 100
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        for vectors, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(vectors)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        print(f"Epoch {epoch + 1}/{epochs}, Train Loss: {total_loss:.4f}")

        # Validation
        model.eval()
        val_loss = 0
        correct = 0
        total = 0
        with torch.no_grad():
            for vectors, labels in val_loader:
                outputs = model(vectors)
                loss = criterion(outputs, labels)
                val_loss += loss.item()

                _, predicted = torch.max(outputs, 1)
                correct += (predicted == labels).sum().item()
                total += labels.size(0)

        val_loss /= len(val_loader)
        val_accuracy = correct / total
        print(f"Validation Loss: {val_loss:.4f}, Validation Accuracy: {val_accuracy * 100:.2f}%")

        # Save the best model based on validation loss
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            best_model_state = model.state_dict()

    # Load the best model weights
    model.load_state_dict(best_model_state)
    print("Best model weights loaded.")

    # Test the model
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for vectors, labels in test_loader:
            outputs = model(vectors)
            _, predicted = torch.max(outputs, 1)
            correct += (predicted == labels).sum().item()
            total += labels.size(0)

    test_accuracy = correct / total
    print(f"Test Accuracy: {test_accuracy * 100:.2f}%")

    # Save the trained model
    torch.save(model.state_dict(), "vincent_van_gogh_classifier.pth")
    print("Model saved as vincent_van_gogh_classifier.pth")


if __name__ == "__main__":
    root_directory = "vectorsImg2VecVgg19"
    train_classifier(root_directory)