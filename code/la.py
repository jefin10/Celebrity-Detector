import os

def traverse_folders(root_folder):
    folder_dict = {}

    for root, dirs, files in os.walk(root_folder):
        folder_name = os.path.basename(root)
        contents = [os.path.join(root, name) for name in dirs + files]
        folder_dict[folder_name] = contents
    
    return folder_dict

# Example usage:
root_folder =r'C:\Users\ASUS\Desktop\VS code\ML-AI\Celebrity_Detection\data'
folder_contents = traverse_folders(root_folder)

# Print the dictionary
for folder, contents in folder_contents.items():
    print(f"Folder: {folder}")
    for content in contents:
        print(f"  - {content}")
