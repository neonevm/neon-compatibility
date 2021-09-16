from typing import List
from dataclasses import dataclass


@dataclass
class InputData():
    test_file: str
    test_files: List[str]
    contracts: List[str]
    migration_script: str
