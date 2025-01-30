import os

# Define the root directory
root_dir = r'C:\Users\aless\OneDrive - UC San Diego\cs-and-law\code\data\RedBubbleNotVVG'

# Function to rename files based on folder name and a sequential number
def rename_files_by_folder(root_dir):
    for foldername, _, filenames in os.walk(root_dir):
        filenames.sort()  # Ensures consistent ordering
        for index, filename in enumerate(filenames, start=1):
            old_path = os.path.join(foldername, filename)
            _, ext = os.path.splitext(filename)  # Get file extension
            new_filename = f"{os.path.basename(foldername)}_{index}{ext}"
            new_path = os.path.join(foldername, new_filename)
            
            if old_path != new_path:  # Avoid renaming if name is the same
                os.rename(old_path, new_path)
                print(f"Renamed: {old_path} -> {new_path}")

# Execute the renaming process
rename_files_by_folder(root_dir)